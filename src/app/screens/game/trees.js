import React, {Component, Fragment} from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import styles from './styles';
import Tree from '../../components/game-tree';

class TouchableTree extends Component {
    state = {
        touching: false,
        treeHeight: 0,
        height: 0,
    }

    onTouchStart = () => {
        this.props.onTouchStart(this.props.id, this.props.index);
        this.setState({touching: true});
    }

    onTouchEnd = e => {
        this.props.onTouchEnd(this.props.id, this.props.index, this.isOutside(e));
        this.setState({touching: false});
    }

    onTouchMove = e => {
        this.setState({touching: !this.isOutside(e)});
    }

    isOutside = e => {
        // console.log('onRelease', e.nativeEvent.locationX, e.nativeEvent.locationY);
        const {locationX, locationY} = e.nativeEvent;
        return locationX < 0 || locationX > Tree.WIDTH || locationY < 0 || locationY > this.state.height;
    }

    onTreeHeight = treeHeight => this.setState({treeHeight})

    onLayout = event => this.setState({
        height: event.nativeEvent.layout.height
    })

    render() {
        const {label, balance, id, isGoalOverlayOpen} = this.props;

        return (
            <View
                onStartShouldSetResponder={() => true}
                onMoveShouldSetResponder={() => true}
                onResponderStart={this.onTouchStart}
                onResponderEnd={this.onTouchEnd}
                onResponderMove={this.onTouchMove}
                onLayout={this.onLayout}
                style={[styles.tree, {left: this.props.left}]}>
                <Tree
                    name={label}
                    value={parseFloat(balance)}
                    overlayOpen={isGoalOverlayOpen}
                    highlight={this.state.touching}
                    onTreeHeight={this.onTreeHeight}
                />
            </View>
        );
    }
}

export default ({
    kid,
    onTouchStart,
    onTouchEnd,
    onNewTreeClicked,
    isGoalOverlayOpen,
}) => {
    const startX = (Dimensions.get('window').width - Tree.WIDTH) / 2;

    return (
        <Fragment>
            {kid.goals && kid.goals.map((goal, i) => (
                <TouchableTree
                    key={i}
                    label={goal.name}
                    id={goal.id}
                    index={i + 1}
                    balance={goal.balance}
                    isGoalOverlayOpen={isGoalOverlayOpen}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    left={startX + Tree.SPACING * (i)}
                />
            ))}

            <TouchableOpacity onPress={onNewTreeClicked} style={[styles.tree, {
                left: startX + Tree.SPACING * kid.goals.length
            }]}>
                <Tree
                    name="NEW GOAL?"
                    newValue
                    value={'0'}
                    overlayOpen={isGoalOverlayOpen}
                />
            </TouchableOpacity>
        </Fragment>
    );
};
