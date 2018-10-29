import React, {Component, Fragment} from 'react';
import {View, Text, Image} from 'react-native';
import Leaf from '../leaf';
import styles from './styles';

const WIDTH = 100;
const SPACING = 190;
const HEIGHT = 270;
// const WIDTH = Math.floor(Dimensions.get('window').width * 0.45);

// console.log('Tree.WIDTH', WIDTH);

const getValueFontSize = val => val.length > 6 ? (2 + Math.max(6, 20 - val.length)) : 20;

export class Tree extends Component {
    static WIDTH = WIDTH
    static SPACING = SPACING
    static HEIGHT = HEIGHT

    state = {
        leafLocations: [[0, 0], [10, 10], [20, -20], [30, 20], [30, 0], [40, 20], [50, -10], [60, 30], [70, 0], [80, -10]],
        colors: ['rgb(50,165,113)', 'rgb(77,204,70)'],
        leavesList: [],
        treeHeight: 0,
    }

    static defaultProps = {
        onTreeHeight: () => {}
    }

    componentDidMount() {
        this.getLeavesList();
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.getLeavesList();
        }
    }

    renderLeaf(leaf) {
        const diameter = 30 + Math.floor(Math.random() * 20);

        const currentStyles = {
            position: 'absolute',
            width: 50,
            height: 50,
            bottom: 40 + leaf.position[0],
            marginLeft: leaf.position[1] - 25,
            left: '50%',
        };

        return (
            <View key={leaf.id} style={currentStyles}>
                <Leaf diameter={diameter} id={leaf.id} />
            </View>
        );
    }

    getLeavesList = () => {
        const {leafLocations} = this.state;
        const {value} = this.props;
        const leavesList = [];

        if (value < 3) {
            this.setState({leavesList, treeHeight: 80});
            return;
        }

        const numberLeaves = Math.min(10, Math.max(2, Math.floor(value / 10)));


        for (let i = 0; i < numberLeaves; i++) {
            leavesList.push({
                id: i,
                key: `key_${i}`,
                position: leafLocations[i % 10],
                color: this.state.colors[Math.floor(Math.random() * 2)],
            });
        }

        const treeHeight = 90 + Math.max(...leavesList.map(l => l.position[0]));

        // console.log(this.props.name, 'treeHeight', treeHeight);

        this.setState({leavesList, treeHeight});

        this.props.onTreeHeight(treeHeight);
    }

    render() {
        const {value, name, newValue, overlayOpen, highlight} = this.props;

        return (
            <View
                pointerEvents="none"
                style={[styles.outer, {width: WIDTH}, {
                    opacity: highlight ? 0.5 : 1
                }]}>
                <View style={[styles.tree, {width: WIDTH, height: this.state.treeHeight}]}>
                    <Image style={styles.trunk} source={require('./images/trunk.png')} />
                    {value > 2 ?
                        <Fragment>
                            {this.state.leavesList.map(leaf => this.renderLeaf(leaf))}
                        </Fragment>
                        :
                        <Image style={styles.sprout} source={require('./images/sprout.png')} />
                    }
                </View>
                <Text style={styles.name}>{!overlayOpen ? name : ''}</Text>
                <View style={[
                    styles.valueWrapper,
                    newValue ? styles.newValue : {
                        opacity: overlayOpen ? 0 : 1,
                    }
                ]}>
                    <Text style={[
                        styles.value,
                        newValue ? styles.valueNew : {
                            fontSize: getValueFontSize(String(value)),
                        }
                    ]}>{value}</Text>
                </View>
            </View>
        );
    }
}

export default Tree;
