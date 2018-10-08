import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, Dimensions, TouchableOpacity, Animated, Easing} from 'react-native';
import {
    TRANSFER_TYPE_TASK,
    // TRANSFER_TYPE_GIFT,
    NOTIFICATION_STAGE_TASK_QUESTION,
    NOTIFICATION_STAGE_ALLOWANCE_CLOUD,
    NOTIFICATION_STAGE_TASK_GREAT
} from 'app/constants/game';

import Storage from 'app/utils/storage';
import moment from 'moment';
import styles from './styles';
// import Learn from '../learn';
import GameBg from '../../components/game-bg';
import GameCounter from '../../components/game-counter';
import Tree from '../../components/game-tree';
import Pigzbe from '../../components/game-pigzbe';
import GameNotification from 'app/components/game-notification';
import GameCarousel from 'app/components/game-carousel';
import GameCloudFlow from 'app/components/game-cloud-flow';
import GoalOverlay from 'app/components/game-goal-overlay';
import GameMessageBubble from 'app/components/game-message-bubble';
import {gameOverlayOpen} from '../../actions';
import {claimWollo} from '../../actions';

export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetX: 0,
            cloudStatus: null,
            isGoalOverlayOpen: false,
            goalOverlayAddress: null,
            optimisticBalances: props.balances,
            raining: false,

            // Tour state
            tourType: null,
            tourStep: 0,
            lastStepTime: null,
            showTapFirstCloud: false,
            showAskParent: false,
            showTapCloudOrTree: false,

            y: new Animated.Value(0),
        };
    }

    async componentDidMount() {
        // Open the tour if needed
        const key = `${this.props.kid.address}_numVisits`;
        const {numVisits = 0} = await Storage.load(key);

        if (numVisits === 0) {
            this.setState({
                tourType: 'firstTime',
            });
        } else if (true || numVisits === 1) {
            this.setState({
                tourType: 'secondTime',
            });
            setTimeout(this.closeSecondTimeTour, 4000);
        }
        await Storage.save(key, {numVisits: numVisits + 1});
    }

    closeSecondTimeTour = () => {
        if (this.state.tourType === 'secondTime' && this.state.tourStep === 0) {
            this.setState({
                tourType: null,
                showTapCloudOrTree: true
            });
        }
    }

    onClickCounter = () => this.props.dispatch(gameOverlayOpen(true))

    onMove = dx => {
        const numGoals = this.props.kid.goals && this.props.kid.goals.length || 0;
        const minX = 0;
        const maxX = (1 + numGoals) * Tree.WIDTH;
        const newX = Math.max(minX, Math.min(maxX, this.state.targetX + dx * Tree.WIDTH));
        const targetX = Math.floor(newX / Tree.WIDTH) * Tree.WIDTH;
        this.setState({targetX});
    }

    onClaim = (hash, amount) => {
        // Close any message bubbles asking the user to click a cloud
        this.setState({
            showTapFirstCloud: false,
            showAskParent: false,
            showTapCloudOrTree: false,
        });

        this.props.dispatch(claimWollo(
            this.props.kid.address, this.props.kid.home, hash, amount
        ));
    }

    onTreeClicked = async (goalAddress) => {
        if (this.state.cloudStatus === NOTIFICATION_STAGE_TASK_GREAT || this.state.cloudStatus === NOTIFICATION_STAGE_ALLOWANCE_CLOUD) {

            if (this.state.currentCloud.amount > 0) {
                // if there's one wollo left on the current cloud
                // let's just optimistically count down + hide cloud

                const optimisticBalancesCopy = {...this.state.optimisticBalances};
                optimisticBalancesCopy[goalAddress] = parseFloat(optimisticBalancesCopy[goalAddress]) + 1;
                clearTimeout(this.timeoutHandle);
                const amountAfterUpdate = this.state.currentCloud.amount - 1;

                this.setState({
                    cloudStatus: amountAfterUpdate === 0 ? null : this.state.cloudStatus,
                    showCloud: amountAfterUpdate === 0 ? false : this.state.showCloud,
                    currentCloud: {
                        ...this.state.currentCloud,
                        amount: amountAfterUpdate
                    },
                    optimisticBalances: optimisticBalancesCopy,
                    raining: true,
                    lastTreeClicked: Date.now(),
                });

                this.timeoutHandle = setTimeout(() => {
                    const delta = Date.now() - this.state.lastTreeClicked;

                    if (delta > 1500) {
                        this.setState({raining: false});

                        console.log('timeout: dispatch claim wollo function', this.state.currentCloudStartAmount - this.state.currentCloud.amount);
                        const amountToSend = this.state.currentCloudStartAmount - this.state.currentCloud.amount;

                        this.props.dispatch(claimWollo(
                            this.props.kid.address, goalAddress, this.state.currentCloud.hash, amountToSend.toString(), amountAfterUpdate
                        ));
                        // check here if stuff has actually been updated in the blockchain
                    }
                }, 2000);
            }

            // only do this if all wollos have been sent:
            if (this.state.cloudStatus === NOTIFICATION_STAGE_TASK_GREAT) {
                // todo need to get rid of task but need to derive task data currently
                // await this.props.dispatch(deleteTask(this.props.kid, this.state.currentCloud.taskToEdit));
            }

        } else {
            this.openGoalOverlay(goalAddress);
            this.setState({
                cloudStatus: null,
                showCloud: false
            });
        }
    }

    onActivateCloud = (currentCloud) => {
        this.setState({
            showCloud: true,
            currentCloud,
            currentCloudStartAmount: currentCloud.amount,
            cloudStatus: currentCloud.type === TRANSFER_TYPE_TASK ? NOTIFICATION_STAGE_TASK_QUESTION : NOTIFICATION_STAGE_ALLOWANCE_CLOUD,

            // Close any message bubbles asking the user to click a cloud
            showTapFirstCloud: false,
            showAskParent: false,
            showTapCloudOrTree: false,
        });
    }

    onCloudStatusChange = (status) => {
        this.setState({
            cloudStatus: status,
            showCloud: !!status,
        });
    }

    openGoalOverlay = (address = null) => {
        this.setState({
            isGoalOverlayOpen: true,
            goalOverlayAddress: address,

            // Close any message bubbles asking the user to click a tree
            showTapFirstCloud: false,
            showAskParent: false,
            showTapCloudOrTree: false,
        }, this.animateBg);
    }

    closeGoalOverlay = () => {
        this.setState({
            isGoalOverlayOpen: false,
            goalOverlayAddress: null,
        }, this.animateBg);
    }

    animateBg = () => {
        const open = this.state.isGoalOverlayOpen;
        Animated.timing(this.state.y, {
            toValue: open ? -350 : 0,
            duration: open ? 500 : 400,
            easing: open ? Easing.out(Easing.quad) : Easing.back(1),
        }).start();
    }

    render() {
        // console.log(JSON.stringify(this.props, null, 2));
        const {
            dispatch,
            exchange,
            wolloCollected,
            overlayOpen,
            kid,
            parentNickname,
        } = this.props;

        const {
            showCloud,
            currentCloud,
            cloudStatus,
            raining,
            optimisticBalances: balances,
            showTapFirstCloud,
            showAskParent,
            showTapCloudOrTree,
        } = this.state;

        console.log('>>> balances', this.state.balances);

        const totalWollo = (parseFloat(balances[kid.home]) || 0) + kid.goals.reduce((total, goal) => {
            return total + (parseFloat(balances[goal.address]) || 0);
        }, 0);

        const pigzbe = (
            <Pigzbe
                style={{
                    position: 'absolute',
                    bottom: 148,
                    left: 36
                }}
            />
        );
        const wolloCounter = (
            <View style={styles.counter}>
                <GameCounter
                    value={totalWollo}
                    onPress={this.onClickCounter}
                />
            </View>
        );
        const clouds = (!kid.actions || kid.actions.length === 0) ? null : (
            <View style={styles.clouds}>
                {showCloud ? (
                    <GameCloudFlow
                        changeStatus={this.onCloudStatusChange}
                        status={cloudStatus}
                        cloudData={currentCloud}
                        raining={raining}
                    />
                ) : (
                        <GameCarousel
                            {...{
                                Item: GameNotification,
                                width: 200,
                                itemWidth: 200,
                                data: kid.actions.map(a => ({
                                    ...a,
                                    key: a.hash,
                                    onActivateCloud: this.onActivateCloud
                                }))
                            }}
                        />
                )}
            </View>
        );

        return (
            <View style={styles.full}>
                <Animated.View style={{
                    backgroundColor: 'red',
                    flex: 1,
                    top: this.state.y
                }}>
                    <GameBg
                        targetX={this.state.targetX}
                        onMove={this.onMove}>
                        <View style={[styles.trees, {
                            left: (Dimensions.get('window').width - Tree.WIDTH) / 2,
                        }]}>
                            <TouchableOpacity onPress={() => this.onTreeClicked(kid.home)}>
                                <Tree
                                    name="HOMETREE"
                                    value={(balances && balances[kid.home] !== undefined) ? parseFloat(balances[kid.home]) : 0}
                                />
                            </TouchableOpacity>
                            {kid.goals && kid.goals.map((goal, i) => (
                                <TouchableOpacity key={i} onPress={() => this.onTreeClicked(goal.address)}>
                                    <Tree
                                        name={goal.name}
                                        value={(balances && balances[goal.address] !== undefined) ? parseFloat(balances[goal.address]) : 0}
                                    />
                                </TouchableOpacity>
                            ))}

                            <TouchableOpacity onPress={() => this.openGoalOverlay()}>
                                <Tree
                                    name="NEW GOAL?"
                                    newValue={true}
                                    value={'0'}
                                />
                            </TouchableOpacity>
                        </View>
                    </GameBg>
                    {pigzbe}
                </Animated.View>
                {clouds}
                {wolloCounter}
                {/* <Learn
                    dispatch={dispatch}
                    exchange={exchange}
                    wolloCollected={wolloCollected}
                    overlayOpen={overlayOpen}
                /> */}
                {/* <View style={{position: 'absolute', top: 30, right: 0, padding: 5, backgroundColor: 'white'}}>
                    <Text>{kid.name}</Text>
                    <Text>Address: {kid.address ? `${kid.address.slice(0, 6)}...` : ''}</Text>
                    <Text>Balance: {kid.balance}</Text>
                    <Text>Tasks: {kid.tasks && kid.tasks.length || 0}</Text>
                    <Text>Allowances: {kid.allowances && kid.allowances.length || 0}</Text>
                    <Text>Goals: {kid.goals && kid.goals.length || 0}</Text>
                    <Text>Actions: {kid.actions && kid.actions.length || 0}</Text>
                </View> */}

                <GoalOverlay
                    kid={kid}
                    isOpen={this.state.isGoalOverlayOpen}
                    onClose={this.closeGoalOverlay}
                    goalAddress={this.state.goalOverlayAddress}
                    parentName={parentNickname}
                />

                {showTapFirstCloud &&
                    <View style={styles.bubble}>
                        <GameMessageBubble
                            content="Tap your first cloud to begin!"
                        />
                    </View>
                }
                {showAskParent &&
                    <TouchableOpacity style={styles.bubble} onPress={() => {
                        this.setState({showAskParent: false});
                    }}>
                        <GameMessageBubble
                            content={`Why not ask ${parentNickname} to set you some tasks?`}
                        />
                    </TouchableOpacity>
                }
                {showTapCloudOrTree &&
                    <View style={styles.bubble}>
                        <GameMessageBubble
                            content="Select a cloud or tap your tree to manage your Wollo"
                        />
                    </View>
                }
                {this.renderTour(pigzbe, clouds, wolloCounter)}
            </View>
        );
    }

    renderTour(pigzbe, clouds, wolloCounter) {
        const {
            tourType,
            tourStep,
            lastStepTime,
        } = this.state;

        if (tourType === 'secondTime') {
            return (
                <TouchableOpacity style={styles.tourContainer} onPress={this.closeSecondTimeTour}>
                    {tourStep === 0 &&
                        <View style={styles.bubble}>
                            <GameMessageBubble
                                content="Yay, you're back!"
                            />
                        </View>
                    }
                </TouchableOpacity>
            );
        }
        if (tourType === 'firstTime') {
            return (
                <TouchableOpacity style={[
                    styles.tourContainer,
                    tourStep >= 3 ? styles.tourContainerFaded : null,
                ]} onPress={() => {
                    const timeNow = moment().valueOf();
                    if (lastStepTime && (lastStepTime + 500 > timeNow)) {
                        return;
                    }
                    const nextTourStep = tourStep + 1;
                    if (nextTourStep <= 4) {
                        this.setState({
                            tourStep: nextTourStep,
                            lastStepTime: timeNow,
                        });
                    } else {
                        // Tour is done...
                        this.setState({
                            tourType: null,
                            showTapFirstCloud: clouds !== null,
                            showAskParent: clouds === null,
                        });
                    }
                }}>
                    {tourStep === 0 &&
                        <View style={styles.bubble}>
                            <GameMessageBubble
                                content={`Welcome ${this.props.kid.name}. I'm Pigzbe, your piggy companion...`}
                            />
                        </View>
                    }
                    {tourStep === 1 &&
                        <View style={styles.bubble}>
                            <GameMessageBubble
                                content="I think we are going to be great friends."
                            />
                        </View>
                    }
                    {tourStep === 2 &&
                        <View style={styles.bubble}>
                            <GameMessageBubble
                                content="Before we begin, I thought I should show you around."
                            />
                        </View>
                    }
                    {tourStep === 3 &&
                        <Fragment>
                            {wolloCounter}
                            <View style={styles.bubble}>
                                <GameMessageBubble
                                    content="This shows you the total of how much Wollo you have saved in the app."
                                />
                            </View>
                        </Fragment>
                    }
                    {tourStep === 4 &&
                        <Fragment>
                            {clouds === null ? (
                                <View style={styles.clouds}>
                                    <View style={{alignSelf: 'center'}}>
                                        <GameNotification
                                            amount={10}
                                            memo="Description"
                                            onActivateCloud={() => {}}
                                        />
                                    </View>
                                </View>
                            ) : clouds}
                            <View style={styles.bubble}>
                                <GameMessageBubble
                                    content="Pocket money, tasks or gifts will be shown as clouds."
                                />
                            </View>
                        </Fragment>
                    }
                    {tourStep === 5 &&
                        <View style={styles.bubble}>
                            <GameMessageBubble
                                content="Tap your first cloud to begin!"
                            />
                        </View>
                    }
                    {pigzbe}
                </TouchableOpacity>
            );
        }
    }
}

export default connect(state => ({
    kid: state.kids.kids.find(k => k.address === state.auth.kid),
    parentNickname: state.kids.parentNickname,
    exchange: state.coins.exchange,
    wolloCollected: state.game.wolloCollected,
    overlayOpen: state.game.overlayOpen,
    balances: state.kids.balances,
}))(Game);
