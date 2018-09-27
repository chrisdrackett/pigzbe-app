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
            diameter: new Animated.Value(20),
            borderRadius: new Animated.Value(10),
            diameterTo: diameterTo,
            borderTo: diameterTo / 2,
            leafLocations: [[0, -10], [-10, 10], [-20, -20], [-30, 20], [-30, 0], [-40, 20], [-50, -10], [-60, 30], [-70, 0], [-80, -10]],
            color: colorOptions[color],
        };
    }

    componentDidMount() {
        Animated.parallel([
            Animated.timing(this.state.diameter, {
                toValue: this.props.diameter,
                duration: 300,
            }),
            Animated.timing(this.state.borderRadius, {
                toValue: this.state.borderTo,
                duration: 300,
            })
        ]).start();
    }

    render() {
        // const {diameter} = this.props;
        const {color, diameter, borderRadius} = this.state;
        console.log('color, ', this.state.color);

        const currentStyles = {
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
