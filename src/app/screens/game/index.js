import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {
    TRANSFER_TYPE_TASK,
    // TRANSFER_TYPE_GIFT,
    NOTIFICATION_STAGE_TASK_QUESTION,
    NOTIFICATION_STAGE_ALLOWANCE_CLOUD,
    NOTIFICATION_STAGE_TASK_GREAT
} from 'app/constants/game';

import styles from './styles';
import Learn from '../learn';
// import GameTasks from '../game-tasks';
import GameBg from '../../components/game-bg';
import Button from '../../components/button';
import GameCounter from '../../components/game-counter';
import Tree from '../../components/game-tree';
import Pigzbe from '../../components/game-pigzbe';
import GameNotification from 'app/components/game-notification';
import GameCarousel from 'app/components/game-carousel';
import GameCloudFlow from 'app/components/game-cloud-flow';
import GoalOverlay from 'app/components/game-goal-overlay';
import {gameOverlayOpen} from '../../actions';
import {sendWollo, claimWollo, deleteAllowance, deleteTask} from '../../actions';


const TREE_WIDTH = 200;

export class Game extends Component {
    constructor(props) {
        super(props);
        console.log('balances', props.balances);

        this.state = {
            targetX: 0,
            cloudStatus: null,
            isGoalOverlayOpen: false,
            goalOverlayAddress: null,
            optimisticBalances: props.balances,
            raining: false,
        };
    }

    onClickCounter = () => this.props.dispatch(gameOverlayOpen(true))

    onMove = dx => {
        const moveX = dx * -0.5;
        const numGoals = this.props.kid.goals && this.props.kid.goals.length || 0;
        const minX = 0;
        const maxX = (1 + numGoals) * TREE_WIDTH;
        const newX = Math.max(minX, Math.min(maxX, this.state.targetX + moveX));
        this.setState({targetX: newX});
    }

    onRelease = () => {
        const targetX = Math.floor(this.state.targetX / TREE_WIDTH) * TREE_WIDTH;
        this.setState({targetX});
    }

    onClaim = (hash, amount) => {
        console.log('this.props.kid', this.props.kid);

        this.props.dispatch(claimWollo(
            this.props.kid.address, this.props.kid.home, hash, amount
        ));
    }

    onTreeClicked = async (goalAddress) => {
        console.log('---- this.cloudStatus', this.state.cloudStatus);
        if (this.state.cloudStatus === NOTIFICATION_STAGE_TASK_GREAT || this.state.cloudStatus === NOTIFICATION_STAGE_ALLOWANCE_CLOUD) {
            console.log('----- if this.cloudStatus', this.state.cloudStatus, this.state.currentCloud.amount);
            console.log('--------------------------------------- this.state.currentCloud.amount - 1', this.state.currentCloud.amount - 1);

            if (this.state.currentCloud.amount > 0) {
                // if there's one wollo left on the current cloud
                // let's just optimistically count down + hide cloud

                const optimisticBalancesCopy = {...this.state.optimisticBalances};
                optimisticBalancesCopy[goalAddress] = parseFloat(optimisticBalancesCopy[goalAddress]) + 1;
                clearTimeout(this.timeoutHandle);

                this.setState({
                    cloudStatus: this.state.currentCloud.amount === 1 ? null : this.state.cloudStatus,
                    showCloud: this.state.currentCloud.amount === 1 ? false : this.state.showCloud,
                    currentCloud: {
                        ...this.state.currentCloud,
                        amount: this.state.currentCloud.amount - 1
                    },
                    optimisticBalances: optimisticBalancesCopy,
                    raining: true,
                    lastTreeClicked: Date.now(),
                });

                this.timeoutHandle = setTimeout(() => {
                    const delta = Date.now() - this.state.lastTreeClicked;

                    if (delta > 1500) {
                        this.setState({raining: false});

                        console.log('--- dispatch claim wollo function', this.state.currentCloudStartAmount - this.state.currentCloud.amount);

                        this.props.dispatch(claimWollo(
                            this.props.kid.address, goalAddress, this.state.currentCloud.hash, this.state.currentCloudStartAmount - this.state.currentCloud.amount
                            // check here if stuff has actually been updated in the blockchain?
                        ));
                    }
                }, 2000);
            }

            // only do this if all wollos have been sent:
            if (this.state.cloudStatus === NOTIFICATION_STAGE_TASK_GREAT) {
                // todo need to get rid of task but need to derive task data currently
                // await this.props.dispatch(deleteTask(this.props.kid, this.state.currentCloud.taskToEdit));
            }

        } else {
            console.log('----- else this.cloudStatus', this.cloudStatus);
            this.openGoalOverlay(goalAddress);
            this.setState({
                cloudStatus: null,
                showCloud: false
            });
        }

        console.log('TODO: add this cash:', this.state.currentCloud);
        console.log('to this goal:', goalAddress);
    }

    onActivateCloud = (currentCloud) => {
        console.log('onActivateCloud', currentCloud);

        this.setState({
            showCloud: true,
            currentCloud,
            currentCloudStartAmount: currentCloud.amount,
            cloudStatus: currentCloud.type === TRANSFER_TYPE_TASK ? NOTIFICATION_STAGE_TASK_QUESTION : NOTIFICATION_STAGE_ALLOWANCE_CLOUD
        });
    }

    onCloudStatusChange = (status) => {
        console.log('onCloudStatusChange', status);

        this.setState({
            cloudStatus: status
        });
    }

    openGoalOverlay = (address = null) => {
        this.setState({
            isGoalOverlayOpen: true,
            goalOverlayAddress: address,
        });
    }

    closeGoalOverlay = () => {
        this.setState({
            isGoalOverlayOpen: false,
            goalOverlayAddress: null,
        });
    }

    nextTree = () => this.setState({targetX: this.state.targetX + TREE_WIDTH})
    prevTree = () => this.setState({targetX: this.state.targetX - TREE_WIDTH})

    render() {
        const {
            dispatch,
            exchange,
            wolloCollected,
            overlayOpen,
            kid,
            parentNickname,
            // balances,
        } = this.props;

        const balances = this.state.optimisticBalances;

        const totalWollo = (parseFloat(balances[kid.home]) || 0) + kid.goals.reduce((total,goal) => {
            return total + (parseFloat(balances[goal.address]) || 0)
        }, 0);

        const {showCloud, currentCloud} = this.state;

        return (
            <View style={styles.full}>
                <GameBg
                    targetX={this.state.targetX}
                    onMove={this.onMove}
                    onRelease={this.onRelease}>
                    <View style={styles.trees}>
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
                <Pigzbe
                    style={{
                        position: 'absolute',
                        bottom: 148,
                        left: 36
                    }}
                />
                <View style={{position: 'absolute', top: 75, left: 0}}>
                    {showCloud ? <GameCloudFlow
                        changeStatus={this.onCloudStatusChange}
                        status={this.state.cloudStatus}
                        cloudData={currentCloud}
                        raining={this.state.raining}
                    /> : <GameCarousel
                        {...{
                            Item: GameNotification,
                            width: Dimensions.get('window').width,
                            itemWidth: 200,
                            data: kid.actions.map(a => ({
                                ...a,
                                key: a.hash,
                                onActivateCloud: this.onActivateCloud
                            }))
                        }}
                    />}
                </View>
                <View style={styles.counter}>
                    <GameCounter
                        value={totalWollo}
                        onPress={this.onClickCounter}
                    />
                </View>
                <Learn
                    dispatch={dispatch}
                    exchange={exchange}
                    wolloCollected={wolloCollected}
                    overlayOpen={overlayOpen}
                />
                {/* {kid.tasks.length ? (
                    <GameTasks
                        dispatch={dispatch}
                        parentNickname={parentNickname}
                        kid={kid}
                    />
                ) : null} */}
                <View style={{position: 'absolute', top: 30, right: 0, padding: 5, backgroundColor: 'white'}}>
                    <Text>{kid.name}</Text>
                    <Text>Address: {kid.address ? `${kid.address.slice(0, 6)}...` : ''}</Text>
                    <Text>Balance: {kid.balance}</Text>
                    <Text>Tasks: {kid.tasks && kid.tasks.length || 0}</Text>
                    <Text>Allowances: {kid.allowances && kid.allowances.length || 0}</Text>
                    <Text>Goals: {kid.goals && kid.goals.length || 0}</Text>
                    <Text>Actions: {kid.actions && kid.actions.length || 0}</Text>
                    {/* <Text>MAX: {kid.goals && kid.goals.length || 0}</Text> */}
                    <Button label="NEXT TREE" onPress={this.nextTree}/>
                    <Button label="PREV TREE" onPress={this.prevTree}/>
                </View>

                <GoalOverlay
                    kid={kid}
                    isOpen={this.state.isGoalOverlayOpen}
                    onClose={this.closeGoalOverlay}
                    goalAddress={this.state.goalOverlayAddress}
                    parentName={parentNickname}
                />
            </View>
        );
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
