import React, {Component} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import styles from './styles';
import {paddingH} from '../../styles';

const getWidth = () => Dimensions.get('window').width;

const getStyle = (deviceWidth, body, style, light, white, scroll) => {
    let s = [styles.container, {width: white ? deviceWidth - paddingH * 2 : deviceWidth}];

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
    }

    if (!scroll) {
        s = s.concat(styles.justifyCenter);
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
            contentContainerStyle: scroll ? [styles.justifyCenter, styles.scroll] : null
        };

        return (
            <ViewType {...props} onLayout={this.onLayout}>
                {children}
            </ViewType>
        );
    }
}
