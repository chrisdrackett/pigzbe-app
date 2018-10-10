import React from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import styles from './styles';
import Tree from '../../components/game-tree';

export default ({
    kid,
    balances,
    onTouchStart,
    onTouchEnd,
    onNewTreeClicked,
    isGoalOverlayOpen,
}) => (
    <View style={[styles.trees, {
        left: (Dimensions.get('window').width - Tree.WIDTH) / 2,
    }]}>
        <View
            onStartShouldSetResponder={() => true}
            onResponderStart={() => onTouchStart(kid.home, 0)}
            onResponderEnd={() => onTouchEnd(kid.home, 0)}
        >
            <Tree
                name="HOMETREE"
                value={(balances && balances[kid.home] !== undefined) ? parseFloat(balances[kid.home]) : 0}
                overlayOpen={isGoalOverlayOpen}
            />
        </View>
        {kid.goals && kid.goals.map((goal, i) => (
            <View
                key={i}
                onStartShouldSetResponder={() => true}
                onResponderStart={() => onTouchStart(goal.address, i + 1)}
                onResponderEnd={() => onTouchEnd(goal.address, i + 1)}
            >
                <Tree
                    name={goal.name}
                    value={(balances && balances[goal.address] !== undefined) ? parseFloat(balances[goal.address]) : 0}
                    goalValue={goal.reward}
                    overlayOpen={isGoalOverlayOpen}
                />
            </View>
        ))}

        <TouchableOpacity onPress={onNewTreeClicked}>
            <Tree
                name="NEW GOAL?"
                newValue
                value={'0'}
                overlayOpen={isGoalOverlayOpen}
            />
        </TouchableOpacity>
    </View>
);
