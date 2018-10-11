import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Dimensions, Animated, Easing} from 'react-native';
import {
    TRANSFER_TYPE_TASK,
    NOTIFICATION_STAGE_TASK_QUESTION,
    NOTIFICATION_STAGE_ALLOWANCE_CLOUD,
    NOTIFICATION_STAGE_TASK_GREAT
} from 'app/constants/game';

import Storage from 'app/utils/storage';
import moment from 'moment';
import styles from './styles';
import GameBg from '../../components/game-bg';
import GameCounter from '../../components/game-counter';
import Tree from '../../components/game-tree';
import Pigzbe from '../../components/game-pigzbe';
import GameNotification from 'app/components/game-notification';
import GameCarousel from 'app/components/game-carousel';
import GameCloudFlow from 'app/components/game-cloud-flow';
import GoalOverlay from 'app/components/game-goal-overlay';
import Loader from 'app/components/loader';
import {claimWollo} from '../../actions';
import BigNumber from 'bignumber.js';
import Tour from './tour';
import Trees from './trees';
import Messages from './messages';

export class Game extends Component {
    state = {
        targetX: 0,
        cloudStatus: null,
        isGoalOverlayOpen: false,
        goalOverlayAddress: null,
        optimisticBalances: {...this.props.balances},
        raining: false,
        y: new Animated.Value(0),
        transfers: [],

        // Tour state
        tourType: null,
        tourStep: 0,
        lastStepTime: null,
        showTapFirstCloud: false,
        showAskParent: false,
        showTapCloudOrTree: false,
    }

    componentDidUpdate(prevProps) {
        if (prevProps.balances !== this.props.balances) {
            console.log('UPDATE BALANCES FROM PROPS UPDATE');
            this.setState({
                optimisticBalances: {...this.props.balances},
            });
        }
    }

    async componentDidMount() {
        // Open the tour if needed
        const key = `${this.props.kid.address}_numVisits`;
        const {numVisits = 0} = await Storage.load(key);

        if (numVisits === 0) {
            this.setState({
                tourType: 'firstTime',
            });
        } else {
            this.setState({
                tourType: 'secondTime',
            });
            setTimeout(this.closeSecondTimeTour, 4000);
        }
        await Storage.save(key, {numVisits: numVisits + 1});
    }

    onAdvanceTour = () => {
        const timeNow = moment().valueOf();
        if (this.state.lastStepTime && (this.state.lastStepTime + 500 > timeNow)) {
            return;
        }
        const nextTourStep = this.state.tourStep + 1;
        if (nextTourStep <= 4) {
            this.setState({
                tourStep: nextTourStep,
                lastStepTime: timeNow,
            });
        } else {
            // Tour is done...
            const hasActions = this.props.kid.actions && this.props.kid.actions.length > 0;

            this.setState({
                tourType: null,
                showTapFirstCloud: hasActions,
                showAskParent: !hasActions,
            });
        }
    }

    closeSecondTimeTour = () => {
        if (this.state.tourType === 'secondTime' && this.state.tourStep === 0) {
            this.setState({
                tourType: null,
                showTapCloudOrTree: true
            });
        }
    }

    hideAskParent = () => this.setState({showAskParent: false})

    onMove = dx => {
        const numGoals = this.props.kid.goals && this.props.kid.goals.length || 0;
        const minX = 0;
        const maxX = (1 + numGoals) * Tree.WIDTH;
        const newX = Math.max(minX, Math.min(maxX, this.state.targetX + dx * Tree.WIDTH));
        const targetX = Math.floor(newX / Tree.WIDTH) * Tree.WIDTH;
        this.setState({targetX});
    }

    onNewTreeClicked = () => {
        const goals = this.props.kid.goals || [];
        const index = goals.length + 1;
        this.setState({targetX: Tree.WIDTH * index});
        this.openGoalOverlay();
    }

    countUpBalance = (goalAddress) => {
        console.log('this.state.currentCloud.amount', this.state.currentCloud.amount);
        console.log('new BigNumber(this.state.currentCloud.amount).isGreaterThan(0)', new BigNumber(this.state.currentCloud.amount).isGreaterThan(0));
        if (this.state.currentCloud && new BigNumber(this.state.currentCloud.amount).isGreaterThan(0)) {
            console.log('clearTimeout');
            clearTimeout(this.timeoutHandle);
            // if there's one wollo left on the current cloud
            // let's just optimistically count down + hide cloud

            // TODO: convert to bignumber.js

            const amountToAdd = BigNumber.min(this.state.currentCloud.amount, 1);

            console.log('amountToAdd', amountToAdd.toString(10));

            const transfer = {
                amount: amountToAdd.toString(10),
                hash: this.state.currentCloud.hash,
                destination: goalAddress,
            };

            const optimisticBalancesCopy = {...this.state.optimisticBalances};
            const newBalance = new BigNumber(optimisticBalancesCopy[goalAddress]).plus(amountToAdd);
            optimisticBalancesCopy[goalAddress] = newBalance.toString(10);

            const amountAfterUpdate = new BigNumber(this.state.currentCloud.amount).minus(amountToAdd);
            console.log('amountAfterUpdate', amountAfterUpdate.toString(10));

            this.setState({
                currentCloud: {
                    ...this.state.currentCloud,
                    amount: amountAfterUpdate.toString(10)
                },
                optimisticBalances: optimisticBalancesCopy,
                raining: true,
                transfers: this.state.transfers.concat(transfer)
            });
        }
    }

    onTouchStart = (goalAddress, index) => {
        console.log('onTouchStart', goalAddress, index, this.state.cloudStatus);

        // current Tree:
        this.setState({targetX: Tree.WIDTH * index});

        if (this.state.cloudStatus === NOTIFICATION_STAGE_TASK_GREAT || this.state.cloudStatus === NOTIFICATION_STAGE_ALLOWANCE_CLOUD) {

            this.countUpBalance(goalAddress);

            this.touchTimer = setInterval(() => {
                this.countUpBalance(goalAddress);
            }, 300);
        }
    }

    onTouchEnd = (goalAddress, index) => {
        console.log('onTouchEnd', goalAddress, index, this.state);
        clearInterval(this.touchTimer);

        console.log('this.state.cloudStatus', this.state.cloudStatus);

        if (this.state.cloudStatus === NOTIFICATION_STAGE_TASK_GREAT || this.state.cloudStatus === NOTIFICATION_STAGE_ALLOWANCE_CLOUD) {
            clearTimeout(this.timeoutHandle);
            console.log('this.state.currentCloud.amount', this.state.currentCloud.amount);
            console.log('this.state.currentCloud && Number(this.state.currentCloud.amount) === 0', this.state.currentCloud && Number(this.state.currentCloud.amount) === 0);
            if (this.state.currentCloud && Number(this.state.currentCloud.amount) === 0) {
                this.setState({
                    cloudStatus: null,
                    showCloud: false,
                });
                this.transferWollo();
            } else {
                console.log('START TIMEOUT');
                this.timeoutHandle = setTimeout(() => {
                    this.transferWollo();
                }, 4000);
            }
        } else if (!this.state.raining) {
            // if we are not dropping wollos on tree let's treat as normal tree click:

            this.openGoalOverlay(goalAddress);
            this.setState({
                cloudStatus: null,
                showCloud: false
            });
        }
    }

    transferWollo = () => {
        console.log('transferWollo');

        this.setState({
            raining: false
        });

        const {transfers} = this.state;

        for (const transfer of transfers) {
            console.log('-- transfer', transfer.amount, transfer.hash, transfer.destination);
        }

        this.setState({transfers: []});

        this.props.dispatch(claimWollo(this.props.kid.address, transfers));
    }

    onActivateCloud = (currentCloud) => this.setState({
        showCloud: true,
        currentCloud,
        cloudStatus: currentCloud.type === TRANSFER_TYPE_TASK ? NOTIFICATION_STAGE_TASK_QUESTION : NOTIFICATION_STAGE_ALLOWANCE_CLOUD,
        // Close any message bubbles asking the user to click a cloud
        showTapFirstCloud: false,
        showAskParent: false,
        showTapCloudOrTree: false,
    });

    onCloudStatusChange = (status) => this.setState({
        cloudStatus: status,
        showCloud: !!status,
    });

    openGoalOverlay = (address = null) => this.setState({
        isGoalOverlayOpen: true,
        goalOverlayAddress: address,
        // Close any message bubbles asking the user to click a tree
        showTapFirstCloud: false,
        showAskParent: false,
        showTapCloudOrTree: false,
    }, this.animateBg);

    closeGoalOverlay = () => this.setState({
        isGoalOverlayOpen: false,
        goalOverlayAddress: null,
    }, this.animateBg);

    animateBg = () => {
        const open = this.state.isGoalOverlayOpen;
        Animated.timing(this.state.y, {
            toValue: open ? 80 - Dimensions.get('window').height * 0.59 : 0,
            duration: open ? 500 : 400,
            easing: open ? Easing.out(Easing.quad) : Easing.back(1),
        }).start();
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
        clearInterval(this.touchTimer);
    }

    render() {
        // console.log(JSON.stringify(this.props, null, 2));
        const {
            kid,
            parentNickname,
            loading,
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

        const totalWollo = kid.goals.reduce((n, g) => {
            return balances[g.address] ? n.plus(balances[g.address]) : n;
        }, new BigNumber(balances[kid.home])).toString(10);

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
                />
            </View>
        );
        const clouds = (!kid.actions || kid.actions.length === 0) ? null : (
            <View style={styles.clouds}>
                {showCloud || loading ? (
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
                    flex: 1,
                    top: this.state.y
                }}>
                    <GameBg
                        targetX={this.state.targetX}
                        onMove={this.onMove}>
                        <Trees
                            kid={kid}
                            balances={balances}
                            onTouchStart={this.onTouchStart}
                            onTouchEnd={this.onTouchEnd}
                            onNewTreeClicked={this.onNewTreeClicked}
                            isGoalOverlayOpen={this.state.isGoalOverlayOpen}
                        />
                    </GameBg>
                    {pigzbe}
                </Animated.View>
                {clouds}
                {wolloCounter}
                <GoalOverlay
                    kid={kid}
                    isOpen={this.state.isGoalOverlayOpen}
                    onClose={this.closeGoalOverlay}
                    goalAddress={this.state.goalOverlayAddress}
                    parentName={parentNickname}
                />
                <Messages
                    showTapFirstCloud={showTapFirstCloud}
                    showAskParent={showAskParent}
                    showTapCloudOrTree={showTapCloudOrTree}
                    parentNickname={parentNickname}
                    hideAskParent={this.hideAskParent}
                />
                <Tour
                    kid={this.props.kid}
                    pigzbe={pigzbe}
                    clouds={clouds}
                    wolloCounter={wolloCounter}
                    tourType={this.state.tourType}
                    tourStep={this.state.tourStep}
                    closeSecondTimeTour={this.closeSecondTimeTour}
                    onAdvanceTour={this.onAdvanceTour}
                />
                {loading && <View style={styles.loading}>
                    <Loader
                        loading
                        message=""
                        light
                    />
                </View>}
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
    loading: state.kids.loading
}))(Game);
