import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import styles from './styles';

const getWidth = () => Dimensions.get('window').width;

const getStyle = (deviceWidth, body, style) => {
    let s = [styles.container, {width: deviceWidth}];

    if (body) {
        s = s.concat(styles.containerBody);
    }
    if (style) {
        s = s.concat(style);
    }

    return s;
};

export default class Container extends Component {
    state = {
        deviceWidth: getWidth()
    }

    render() {
        const {children, body, style} = this.props;
        const {deviceWidth} = this.state;

        return (
            <View style={getStyle(deviceWidth, body, style)} onLayout={() => this.setState({
                deviceWidth: getWidth()
            })}>
                {children}
            </View>
        );
    }
}
