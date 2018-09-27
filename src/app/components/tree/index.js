import React, {Component} from 'react';
import {View, FlatList, Text, Image} from 'react-native';
import Leaf from '../leaf';
import styles from './styles';

export class Tree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberLeaves: Math.max(2, Math.floor(props.value / 10)),
            leafLocations: [[0, -10], [-10, 10], [-20, -20], [-30, 20], [-30, 0], [-40, 20], [-50, -10], [-60, 30], [-70, 0], [-80, -10]],
            colors: ['rgb(50,165,113)', 'rgb(77,204,70)'],
        };
    }

    componentDidMount() {
    }

    renderLeaf(leaf) {
        const diameter = 30 + Math.floor(Math.random() * 20);

        const currentStyles = {
            position: 'absolute',
            top: 100,
            width: diameter,
            height: diameter,
            marginTop: leaf.position[0],
            marginLeft: leaf.position[1] - (diameter / 2),
            left: '50%',
            // borderRadius: diameter / 2,
            // backgroundColor: leaf.color,
        };

        console.log('styles', {...styles.leaf, ...currentStyles});

        // return (<View
        //     style={[styles.leaf, currentStyles]}
        // />);
        return (<View style={currentStyles}>
            <Leaf diameter={diameter} />
        </View>);
    }

    getLeavesList = () => {
        const {leafLocations, numberLeaves} = this.state;
        const leavesList = [];

        for (let i = 0; i < numberLeaves; i++) {
            leavesList.push({
                key: `key_${i}`,
                position: leafLocations[i % 10],
                color: this.state.colors[Math.floor(Math.random() * 2)],
            });
        }

        return leavesList;
    }

    render() {
        const {value, name, newValue} = this.props;
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
                <Text style={styles.name}>{name}</Text>
                <View style={[styles.valueWrapper, newValue ? styles.newValue : {}]}>
                    <Text style={styles.value}>{value}</Text>
                </View>
            </View>
        );
    }
}

export default Tree;
