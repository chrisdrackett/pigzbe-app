import React, {Component} from 'react';
import {View, FlatList, Text, Image} from 'react-native';
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
        const {value} = this.props;
        const {numberLeaves} = this.state;

        return (
            <View style={styles.outer}>
                <View style={styles.tree}>
                    <Image style={styles.trunk} source={require('./images/trunk.png')} />
                    {numberLeaves > 2 ? <FlatList
                        data={this.getLeavesList()}
                        contentContainerStyle={styles.leaves}
                        renderItem={({item}) => this.renderLeaf(item)}
                    /> : <Image style={styles.sprout} source={require('./images/sprout.png')} />
                    }
                </View>
                <View style={styles.valueWrapper}>
                    <Text style={styles.value}>{value}</Text>
                </View>
            </View>
        );
    }
}

export default Tree;
