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
        this.props.onTouchStart(this.props.address, this.props.index);
        this.setState({touching: true});
    }

    onTouchEnd = e => {
        this.props.onTouchEnd(this.props.address, this.props.index, this.isOutside(e));
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
        const {label, balances, address, isGoalOverlayOpen} = this.props;

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
                    value={(balances && balances[address] !== undefined) ? parseFloat(balances[address]) : 0}
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
    balances,
    onTouchStart,
    onTouchEnd,
    onNewTreeClicked,
    isGoalOverlayOpen,
}) => {
    const startX = (Dimensions.get('window').width - Tree.WIDTH) / 2;

    return (
        <Fragment>
            <TouchableTree
                label="HOMETREE"
                address={kid.home}
                index={0}
                balances={balances}
                isGoalOverlayOpen={isGoalOverlayOpen}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                left={startX}
            />

            {kid.goals && kid.goals.map((goal, i) => (
                <TouchableTree
                    key={i}
                    label={goal.name}
                    address={goal.address}
                    index={i + 1}
                    balances={balances}
                    isGoalOverlayOpen={isGoalOverlayOpen}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    left={startX + Tree.SPACING * (i + 1)}
                />
            ))}

            <TouchableOpacity onPress={onNewTreeClicked} style={[styles.tree, {
                left: startX + Tree.SPACING * ((kid.goals && kid.goals.length || 0) + 1)
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
