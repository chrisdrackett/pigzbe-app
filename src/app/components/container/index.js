import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import styles from './styles';

const getWidth = () => Dimensions.get('window').width;

const getStyle = (deviceWidth, body, style, light) => {
    let s = [styles.container, {width: deviceWidth}];

    if (body) {
        s = s.concat(styles.containerBody);
    }
    if (style) {
        s = s.concat(style);
    }

    if (light) {
        s = s.concat(styles.light);
    }

    return s;
};

export default class Container extends Component {
    state = {
        deviceWidth: getWidth()
    }

    onLayout = () => {
        this.setState({deviceWidth: getWidth()});
    }

    render() {
        const {children, body, style, light} = this.props;
        const {deviceWidth} = this.state;

        console.log(light);

        return (
            <View style={getStyle(deviceWidth, body, style, light)} onLayout={this.onLayout}>
                {children}
            </View>
        );
    }
}
