
import React, {Component, Fragment} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import SideSwipe from 'react-native-sideswipe';
import GameGoalCreate from 'app/components/game-goal-create';
import GameGoalWolloMove from 'app/components/game-goal-wollo-move';
import GameGoalParentSend from 'app/components/game-goal-parent-send';
import GameGoalTransactions from 'app/components/game-goal-transactions';
import {Dots} from 'app/components/game-carousel';
import Icon from 'app/components/icon';
import Loader from 'app/components/loader';
import Wollo from 'app/components/wollo';
import {updateBalance} from 'app/actions';
import styles from './styles';
import {MAX_INNER_WIDTH} from 'app/constants';
import isAndroid from 'app/utils/is-android';

export class GameGoalOverlay extends Component {
    state = {
        currentIndex: 0,
    }
    componentDidMount() {
        if (this.props.goalAddress) {
            this.props.dispatch(updateBalance(this.props.goalAddress));
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.goalAddress && prevProps.goalAddress !== this.props.goalAddress) {
            this.props.dispatch(updateBalance(this.props.goalAddress));
        }
    }
    render() {
        const {
            kid,
            isOpen,
            goalAddress,
            onClose,
            parentName,
            balances,
            exchange,
            baseCurrency,
        } = this.props;

        const width = Math.min(MAX_INNER_WIDTH, Dimensions.get('window').width);
        const itemWidth = width;

        const contentOffset = (width - itemWidth) / 2;

        const goalBalance = (balances && balances[goalAddress]) ? balances[goalAddress] : 0;
        const homeTree = {address: kid.home, name: 'Hometree'};
        const goals = [
            homeTree,
            ...kid.goals,
        ].filter(goal => goal.address !== goalAddress);
        const currentGoal = kid.goals.filter(goal => goal.address === goalAddress)[0];
        const hasGoals = kid.goals.length !== 0;

        return (
            <Fragment>
                <Modal
                    isVisible={isOpen}
                    style={styles.modal}
                    backdropOpacity={0.35}
                    backdropColor="rgb(0, 50, 120)"
                    onBackButtonPress={onClose}
                >
                    <KeyboardAvoidingView
                        style={styles.container}
                        offset={0}
                        behavior={isAndroid ? null : 'padding'}
                        enabled
                    >
                        <View
                            style={styles.spacer}
                            onPress={onClose}
                        >
                            {!!goalAddress &&
                                <View style={styles.balance}>
                                    <Text style={styles.balanceText}>{currentGoal ? currentGoal.name : homeTree.name}</Text>
                                    <Wollo
                                        balance={goalBalance}
                                        exchange={exchange}
                                        baseCurrency={baseCurrency}
                                    />
                                </View>
                            }
                        </View>
                        {!goalAddress &&
                            <View style={[styles.newGoal, {width: width, alignSelf: 'center'}]}>
                                <View>
                                    <Text style={styles.title}>New Goal</Text>
                                </View>
                                <GameGoalCreate
                                    kid={kid}
                                    onGoalAdded={onClose}
                                />
                            </View>
                        }
                        {!!goalAddress &&
                            <View style={{flex: 1, alignSelf: 'center'}}>
                                {currentGoal && <View style={styles.goalValueWrap}>
                                    <Image style={styles.goalBackground} source={require('./images/goal.png')} />
                                    <Text style={styles.goalValue}>Goal {currentGoal.reward}</Text>
                                </View>}
                                <View style={styles.dots}>
                                    <Dots length={hasGoals ? 3 : 2} index={this.state.currentIndex} light />
                                </View>
                                <SideSwipe
                                    index={this.state.currentIndex}
                                    data={hasGoals ? [1, 2, 3] : [1, 2]}
                                    contentOffset={contentOffset}
                                    onIndexChange={currentIndex => this.setState({currentIndex})}
                                    renderItem={({itemIndex, currentIndex, item, animatedValue}) => (
                                        <TouchableWithoutFeedback>
                                            <View style={{
                                                width: width,
                                                flex: 1,
                                            }}>
                                                {hasGoals && itemIndex === 0 &&
                                                    <Fragment>
                                                        <View>
                                                            <Text style={styles.title}>Move to another tree</Text>
                                                        </View>
                                                        <GameGoalWolloMove
                                                            kid={kid}
                                                            goalAddress={goalAddress}
                                                            goals={goals}
                                                            goalBalance={goalBalance}
                                                            onWolloMoved={onClose}
                                                        />
                                                    </Fragment>
                                                }
                                                {((hasGoals && itemIndex === 1) || (!hasGoals && itemIndex === 0)) &&
                                                    <Fragment>
                                                        <View>
                                                            <Text style={styles.title}>Send Wollo to {parentName}</Text>
                                                        </View>
                                                        <GameGoalParentSend
                                                            goalAddress={goalAddress}
                                                            goalBalance={goalBalance}
                                                            onWolloMoved={onClose}
                                                        />
                                                    </Fragment>
                                                }
                                                {((hasGoals && itemIndex === 2) || (!hasGoals && itemIndex === 1)) &&
                                                    <View style={{flex: 1}}>
                                                        <View>
                                                            <Text style={styles.title}>Deposits / withdrawls</Text>
                                                        </View>
                                                        <GameGoalTransactions
                                                            goalAddress={goalAddress}
                                                        />
                                                    </View>
                                                }

                                            </View>
                                        </TouchableWithoutFeedback>
                                    )}
                                    style={{
                                        width: width,
                                        flex: 1,
                                    }}
                                    itemWidth={itemWidth}
                                />
                            </View>
                        }

                        <TouchableOpacity onPress={onClose} style={styles.backIcon}>
                            <Icon name="gameBack" />
                        </TouchableOpacity>
                    </KeyboardAvoidingView>

                    {this.props.loading &&
                        <View style={styles.loader}>
                            <Loader loading={true} light />
                        </View>
                    }
                </Modal>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        loading: state.kids.goalLoading,
        balances: state.kids.balances,
        exchange: state.exchange.exchange,
        baseCurrency: state.settings.baseCurrency,
    })
)(GameGoalOverlay);
