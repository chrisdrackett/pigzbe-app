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
        optimisticBalances: this.props.balances,
        raining: false,
        y: new Animated.Value(0),

        // Tour state
        tourType: null,
        tourStep: 0,
        lastStepTime: null,
        showTapFirstCloud: false,
        showAskParent: false,
        showTapCloudOrTree: false,
    }

    // componentDidUpdate(prevProps) {
    //     // Temporary fix for balances not updating after doing manual transfers etc
    //     // Will want to remove this and make optomistic balances be in addition to prop.balances
    //     if (!this.state.cloudStatus && !this.state.raining) {
    //         if (JSON.stringify(this.state.optimisticBalances) !== JSON.stringify(this.props.balances)) {
    //             this.setState({
    //                 optimisticBalances: this.props.balances,
    //             });
    //         }
    //     }
    // }

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

    onNewTreeClicked = () => {
        const goals = this.props.kid.goals || [];
        const index = goals.length + 1;
        this.setState({targetX: Tree.WIDTH * index});
        this.openGoalOverlay();
    }

    countUpBalance = (goalAddress) => {
        if (this.state.currentCloud.amount > 0) {
            console.log('clearTimeout');
            clearTimeout(this.timeoutHandle);
            // if there's one wollo left on the current cloud
            // let's just optimistically count down + hide cloud

            const amountToAdd = Math.min(this.state.currentCloud.amount, 1);

            const optimisticBalancesCopy = {...this.state.optimisticBalances};
            optimisticBalancesCopy[goalAddress] = parseFloat(optimisticBalancesCopy[goalAddress]) + amountToAdd;

            const amountAfterUpdate = this.state.currentCloud.amount - amountToAdd;

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
        }
    }

    onTouchStart = (goalAddress, index) => {
        console.log('onTouchStart', goalAddress, index);

        // current Tree:
        this.setState({targetX: Tree.WIDTH * index});

        if (this.state.cloudStatus === NOTIFICATION_STAGE_TASK_GREAT || this.state.cloudStatus === NOTIFICATION_STAGE_ALLOWANCE_CLOUD) {

            this.countUpBalance(goalAddress);

        }

        this.touchStartTime = new Date();
        this.touchTimer = setInterval(() => {
            this.countUpBalance(goalAddress);
        }, 300);
    }

    onTouchEnd = (goalAddress, index) => {
        console.log('onTouchEnd', goalAddress, index, this.state);
        clearInterval(this.touchTimer);

        console.log('this.state.cloudStatus', this.state.cloudStatus);

        if (this.state.cloudStatus === NOTIFICATION_STAGE_TASK_GREAT || this.state.cloudStatus === NOTIFICATION_STAGE_ALLOWANCE_CLOUD) {
            console.log('START TIMEOUT');
            clearTimeout(this.timeoutHandle);
            this.timeoutHandle = setTimeout(this.transferWollo, 2000);
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

        const delta = Date.now() - this.state.lastTreeClicked;

        console.log('delta', delta);

        if (delta > 1500) {
            console.log('START TRANSFER');
            this.setState({
                raining: false
            });

            const {kid, balances} = this.props;
            const {optimisticBalances} = this.state;

            const addresses = kid.goals.map(g => g.address).concat(kid.home);

            const transfers = addresses.reduce((arr, address) => {
                const balance = new BigNumber(balances[address]);
                const optimisticBalance = new BigNumber(optimisticBalances[address]);
                if (optimisticBalance.isGreaterThan(balance)) {
                    const amount = optimisticBalance.minus(balance).toString(10);
                    arr.push({
                        address,
                        amount,
                    });
                }
                return arr;
            }, []);

            console.log('======> transfers', transfers);


            // const totalWollo = (parseFloat(balances[kid.home]) || 0) + kid.goals.reduce((total, goal) => {
            //     return total + (parseFloat(balances[goal.address]) || 0);
            // }, 0);

            // console.log('timeout: dispatch claim wollo function', this.state.currentCloudStartAmount - this.state.currentCloud.amount);
            // const amountToSend = this.state.currentCloudStartAmount - this.state.currentCloud.amount;
            //
            //
            // this.props.dispatch(claimWollo(
            //     this.props.kid.address, goalAddress, this.state.currentCloud.hash, amountToSend.toString(), this.state.currentCloud.amount - 1
            // ));
            // check here if stuff has actually been updated in the blockchain
        }
    }

    onActivateCloud = (currentCloud) => this.setState({
        showCloud: true,
        currentCloud,
        currentCloudStartAmount: currentCloud.amount,
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

        const totalWollo = (parseFloat(balances[kid.home]) || 0) + kid.goals.reduce((total, goal) => {
            return total + (parseFloat(balances[goal.address]) || 0);
        }, 0);
        console.log('totalWollo', totalWollo);

        const totalWollo2 = kid.goals.reduce((n, g) => {
            return n.plus(balances[g.address]);
        }, new BigNumber(balances[kid.home])).toString(10);
        console.log('totalWollo2', totalWollo2);

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
