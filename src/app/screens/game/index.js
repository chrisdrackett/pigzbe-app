import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import styles from './styles';
import Learn from '../learn';
import GameTasks from '../game-tasks';
import GameBg from '../../components/game-bg';
import Button from '../../components/button';
import GameCounter from '../../components/game-counter';
import Tree from '../../components/game-tree';
import Pigzbe from '../../components/game-pigzbe';
import {gameOverlayOpen} from '../../actions';

const TREE_WIDTH = 200;

export class Game extends Component {
    state = {
        treeIndex: 0,
    }

    onClickCounter = () => this.props.dispatch(gameOverlayOpen(true))

    nextTree = () => this.setState({
        treeIndex: Math.min(this.state.treeIndex + 1, (1 + (this.props.kid.goals && this.props.kid.goals.length || 0)))
    })

    prevTree = () => this.setState({
        treeIndex: Math.max(this.state.treeIndex - 1, 0)
    })

    render() {
        const {
            dispatch,
            exchange,
            wolloCollected,
            overlayOpen,
            kid,
            parentNickname
        } = this.props;

        return (
            <View style={styles.full}>
                <GameBg
                    minX={0}
                    maxX={(1 + (kid.goals && kid.goals.length || 0)) * TREE_WIDTH}
                    targetX={this.state.treeIndex * TREE_WIDTH}>
                    <View style={styles.trees}>
                        <Tree
                            name="HOMETREE"
                            value={'0'}
                        />
                        {kid.goals && kid.goals.map((goal, i) => (
                            <Tree
                                key={i}
                                name={goal.name}
                                value={goal.reward}
                            />
                        ))}
                        <Tree
                            name="NEW GOAL?"
                            newValue={true}
                            value={'0'}
                        />
                    </View>
                </GameBg>
                <Pigzbe
                    style={{
                        position: 'absolute',
                        bottom: 148,
                        left: 36
                    }}
                />
                <View style={styles.counter}>
                    <GameCounter
                        value={kid.balance}
                        onPress={this.onClickCounter}
                    />
                </View>
                <Learn
                    dispatch={dispatch}
                    exchange={exchange}
                    wolloCollected={wolloCollected}
                    overlayOpen={overlayOpen}
                />
                {kid.tasks.length ? (
                    <GameTasks
                        dispatch={dispatch}
                        parentNickname={parentNickname}
                        kid={kid}
                    />
                ) : null}
                <View style={{position: 'absolute', top: 30, right: 0, padding: 5, backgroundColor: 'white'}}>
                    <Text>{kid.name}</Text>
                    <Text>Address: {kid.address}</Text>
                    <Text>Balance: {kid.balance}</Text>
                    <Text>Tasks: {kid.tasks && kid.tasks.length || 0}</Text>
                    <Text>Allowances: {kid.allowances && kid.allowances.length || 0}</Text>
                    <Text>Goals: {kid.goals && kid.goals.length || 0}</Text>
                    {/* <Text>MAX: {kid.goals && kid.goals.length || 0}</Text> */}
                    <Button label="NEXT TREE" onPress={this.nextTree}/>
                    <Button label="PREV TREE" onPress={this.prevTree}/>
                </View>
            </View>
        );
    }
}

export default connect(state => ({
    kid: state.kids.kids.find(k => k.address === state.auth.kid),
    parentNickname: state.kids.parentNickname,
    exchange: state.coins.exchange,
    wolloCollected: state.game.wolloCollected,
    overlayOpen: state.game.overlayOpen
}))(Game);
