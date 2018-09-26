import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';

export class Tree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberLeaves: Math.max(2, Math.floor(props.value / 10)),
            leafLocations: [[0, -10], [-10, 10], [-20, -20], [-30, 20]],
            colors: ['rgb(50,165,113)', 'rgb(77,204,70)'],
        };
    }

    componentDidMount() {
    }

    renderLeaf(leaf) {
        const currentStyles = {
            top: 100,
            width: 50,
            height: 50,
            marginLeft: leaf.position[1] - 25,
            marginTop: leaf.position[0],
            borderRadius: 25,
            backgroundColor: leaf.color,
        };

        console.log('styles', {...styles.leaf, ...currentStyles});

        return (<View
            style={[styles.leaf, currentStyles]}
        />);
    }

    getLeavesList = () => {
        const {leafLocations, numberLeaves} = this.state;
        const leavesList = [];

        for (let i = 0; i < numberLeaves; i++) {
            leavesList.push({
                key: `key_${i}`,
                position: leafLocations[i],
                color: this.state.colors[Math.floor(Math.random() * 2)],
            });
        }

        return leavesList;
    }

    render() {
        return (
            <View style={styles.tree}>
                <View style={styles.trunk} />
                <FlatList
                    data={this.getLeavesList()}
                    contentContainerStyle={styles.leaves}
                    renderItem={({item}) => this.renderLeaf(item)}
                />
            </View>
        );
    }
}

export default Tree;
