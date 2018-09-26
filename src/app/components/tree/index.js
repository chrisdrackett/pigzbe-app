import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';

export class Tree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberLeaves: Math.max(2, Math.floor(props.value / 10)),
            leafLocations: [[30, 20], [30, 50], [30, 40], [20, 40]],
            colors: ['rgb(50,165,113)', 'rgb(77,204,70)'],
        };
    }

    componentDidMount() {
    }

    renderLeaf(leaf) {
        console.log('>>> leaf', leaf);

        const currentStyles = {
            left: leaf.position[0],
            right: leaf.position[1],
            width: 50,
            height: 50,
            backgroundColor: leaf.color,
            borderRadius: 25,
        };

        return (<View
            style={[styles.leaf, currentStyles]}
        />);
    }

    getLeavesList = () => {
        const {leafLocations, numberLeaves} = this.state;
        const leavesList = [];

        console.log('>>>> leafLocations', leafLocations);

        for (let i = 0; i < numberLeaves; i++) {
            console.log('i,', i);

            leavesList.push({
                key: i,
                position: leafLocations[i],
                color: this.state.colors[Math.floor(Math.random() * 2)],
            });
        }

        return leavesList;
    }

    render() {
        // const {leaves, value} = this.state;

        return (
            <View style={styles.tree}>
                <FlatList
                    style={{marginBottom: 10}}
                    data={this.getLeavesList()}
                    contentContainerStyle={styles.toggleList}
                    renderItem={({item}) => this.renderLeaf(item)}
                />
                <View style={styles.trunk} />
            </View>
        );
    }
}

export default Tree;
