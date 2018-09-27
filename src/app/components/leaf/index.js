import React, {Component} from 'react';
import {Animated} from 'react-native';
import styles from './styles';

export class Leaf extends Component {
    constructor(props) {
        super(props);

        const color = Math.floor(Math.random() * 2);
        const colorOptions = ['rgb(50,165,113)', 'rgb(77,204,70)'];
        const diameterTo = 30 + Math.floor(Math.random() * 20);

        this.state = {
            diameter: new Animated.Value(0),
            borderRadius: new Animated.Value(0),
            offset: new Animated.Value(25),
            diameterTo: diameterTo,
            borderTo: diameterTo / 2,
            leafLocations: [[0, -10], [-10, 10], [-20, -20], [-30, 20], [-30, 0], [-40, 20], [-50, -10], [-60, 30], [-70, 0], [-80, -10]],
            color: colorOptions[color],
        };
    }

    componentDidMount() {
        const {diameter, diameterTo, borderRadius, borderTo, offset} = this.state;

        Animated.parallel([
            Animated.timing(diameter, {
                toValue: diameterTo,
                duration: 1000,
            }),
            Animated.timing(borderRadius, {
                toValue: borderTo,
                duration: 1000,
            }),
            Animated.timing(offset, {
                toValue: 25 - borderTo,
                duration: 1000,
            })
        ]).start();
    }

    render() {
        // const {diameter} = this.props;
        const {color, diameter, borderRadius, offset} = this.state;
        console.log('color, ', this.state.color);

        const currentStyles = {
            position: 'absolute',
            left: offset,
            top: offset,
            width: diameter,
            height: diameter,
            borderRadius: borderRadius,
            backgroundColor: color,
        };

        return (
            <Animated.View style={currentStyles} />
        );
    }
}

export default Leaf;
