
import React, {Component, Fragment} from 'react';
import {View, Text, TouchableOpacity, Dimensions, TouchableWithoutFeedback} from 'react-native';
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

import styles from './styles';

export class GameGoalOverlay extends Component {
    state = {
        currentIndex: 0,
    }
    render() {
        const {
            isOpen,
            goalAddress,
            goalBalance,
            goals,
            onClose,
            parentName,
        } = this.props;

        const width = Dimensions.get('window').width;
        const itemWidth = width;

        const contentOffset = (width - itemWidth) / 2;

        return (
            <Fragment>
                <Modal
                    isVisible={isOpen}
                    style={styles.modal}
                    backdropOpacity={0.35}
                    backdropColor="rgb(0, 50, 120)"
                >
                    <View style={styles.container}>
                        <View
                            style={styles.spacer} 
                            onPress={onClose}
                        />
                        <TouchableOpacity onPress={onClose} style={{
                            position: 'absolute',
                            left: 10,
                            top: 40,
                        }}>
                            <Icon name="gameBack" />
                        </TouchableOpacity>
                        
                        {!goalAddress &&
                            <GameGoalCreate />
                        }
                        {!!goalAddress &&
                            <View>
                                <View style={styles.dots}>
                                    <Dots length={3} index={this.state.currentIndex} light />
                                </View>
                                <SideSwipe
                                    index={this.state.currentIndex}
                                    data={[1,2,3]}
                                    contentOffset={contentOffset}
                                    onIndexChange={currentIndex => this.setState({currentIndex})}
                                    renderItem={({itemIndex, currentIndex, item, animatedValue}) => (
                                        <TouchableWithoutFeedback>
                                            <View style={{
                                                width: width,
                                            }}>
                                                {itemIndex === 0 &&
                                                    <Fragment>
                                                        <View>
                                                            <Text style={styles.title}>Move to another tree</Text>
                                                        </View>
                                                        <GameGoalWolloMove
                                                            goalAddress={goalAddress}
                                                            goals={goals}
                                                            goalBalance={goalBalance}
                                                        />
                                                    </Fragment>
                                                }
                                                {itemIndex === 1 &&
                                                    <Fragment>
                                                        <View>
                                                            <Text style={styles.title}>Send Wollo to {parentName}</Text>
                                                        </View>
                                                        <GameGoalParentSend
                                                            goalAddress={goalAddress}
                                                            goalBalance={goalBalance}
                                                        />
                                                    </Fragment>
                                                }
                                                {itemIndex === 2 &&
                                                    <Fragment>
                                                        <View>
                                                            <Text style={styles.title}>Deposits / withdrawls</Text>
                                                        </View>
                                                        <GameGoalTransactions
                                                            goalAddress={goalAddress}
                                                        />
                                                    </Fragment>
                                                }
                                                
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )}
                                    style={{
                                        width: width,
                    
                                    }}
                                    itemWidth={itemWidth}
                                />
                            </View>
                        }
                    </View>

                    {this.props.loading &&
                        <View style={styles.loader}>
                            <Loader loading={true} light />
                        </View>
                    }
                </Modal>
            </Fragment>
        )
    }
}

export default connect(
    state => ({
        loading: state.kids.goalLoading,
    })
)(GameGoalOverlay);