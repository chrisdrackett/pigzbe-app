import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Dimensions} from 'react-native';
import {
    TRANSFER_TYPE_TASK,
    // TRANSFER_TYPE_GIFT,
    NOTIFICATION_STAGE_TASK_QUESTION,
    NOTIFICATION_STAGE_ALLOWANCE_CLOUD
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
import {gameOverlayOpen} from '../../actions';
import {claimWollo} from '../../actions';

const TREE_WIDTH = 200;

export class Game extends Component {
    state = {
        targetX: 0,
        cloudStatus: null
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

    onActivateCloud = (currentCloud) => {
        console.log('onActivateCloud', currentCloud);

        this.setState({
            showCloud: true,
            currentCloud,
            cloudStatus: currentCloud.type === TRANSFER_TYPE_TASK ? NOTIFICATION_STAGE_TASK_QUESTION : NOTIFICATION_STAGE_ALLOWANCE_CLOUD
        });
    }

    onCloudStatusChange = (status) => {
        console.log('onCloudStatusChange', status);

        this.setState({
            cloudStatus: status
        });
    }

    render() {
        const {
            dispatch,
            exchange,
            wolloCollected,
            overlayOpen,
            kid,
            // parentNickname
        } = this.props;

        const {showCloud, currentCloud} = this.state;

        return (
            <View style={styles.full}>
                <GameBg
                    targetX={this.state.targetX}
                    onMove={this.onMove}
                    onRelease={this.onRelease}>
                    <View style={styles.trees}>
                        <Tree
                            name="HOMETREE"
                            value={kid.balance}
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
                <View style={{position: 'absolute', top: 75, left: 0}}>
                    {showCloud ? <GameCloudFlow
                        changeStatus={this.onCloudStatusChange}
                        status={this.state.cloudStatus}
                        cloudData={currentCloud}
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
            </View>
        );
    }
}

export default connect(state => ({
    kid: state.kids.kids.find(k => k.address === state.auth.kid),
    // parentNickname: state.kids.parentNickname,
    exchange: state.coins.exchange,
    wolloCollected: state.game.wolloCollected,
    overlayOpen: state.game.overlayOpen
}))(Game);
