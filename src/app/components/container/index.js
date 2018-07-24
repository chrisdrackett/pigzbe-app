import React, {Component} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import styles from './styles';
import {paddingH} from '../../styles';

const getWidth = () => Dimensions.get('window').width;

const getStyle = (deviceWidth, body, style, light, white, scroll) => {
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

    if (white) {
        s = s.concat(styles.white);
        s = s.concat([{
            width: deviceWidth - (paddingH * 2),
            maxWidth: deviceWidth - (paddingH * 2),
            minWidth: deviceWidth - (paddingH * 2)
        }]);
    }

    if (!scroll) {
        s = s.concat(styles.justifyCenter);
    } else {
        s = s.concat(styles.scroll);
    }

    return s;
};

export default class Container extends Component {
    state = {
        deviceWidth: getWidth()
    }

    static defaultProps = {
        scroll: false,
        white: false
    }

    onLayout = () => {
        this.setState({deviceWidth: getWidth()});
    }

    render() {
        const {children, body, style, white, light, scroll} = this.props;
        const {deviceWidth} = this.state;

        const ViewType = scroll ? ScrollView : View;
        const props = {
            style: getStyle(deviceWidth, body, style, light, white, scroll),
            contentContainerStyle: [styles.justifyCenter]
        };

        return (
            <ViewType {...props} onLayout={this.onLayout}>
                {children}
            </ViewType>
        );
    }
}
