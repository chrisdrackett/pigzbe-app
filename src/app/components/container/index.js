import React, {Component} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import styles from './styles';
// import {paddingH} from '../../styles';

const getWidth = () => Dimensions.get('window').width;

const getStyle = (deviceWidth, body, style, light, white, scroll, backgroundColor) => {
    // let s = [styles.container, {width: white ? deviceWidth - paddingH * 2 : deviceWidth}];
    let s = [styles.container, {width: deviceWidth}];

    if (body) {
        s = s.concat(styles.containerBody);
    }

    if (light) {
        s = s.concat(styles.light);
    }

    if (white) {
        s = s.concat(styles.white);
    }

    if (!scroll) {
        // s = s.concat(styles.justifyCenter);
        s = s.concat({justifyContent: 'space-between'});
    }

    if (backgroundColor) {
        s = s.concat({backgroundColor: backgroundColor});
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

    static defaultProps = {
        scroll: false,
        white: false
    }

    onLayout = () => {
        this.setState({deviceWidth: getWidth()});
    }

    render() {
        const {children, body, style, white, light, scroll, backgroundColor} = this.props;
        const {deviceWidth} = this.state;

        const ViewType = scroll ? ScrollView : View;
        const props = {
            style: getStyle(deviceWidth, body, style, light, white, scroll, backgroundColor),
            contentContainerStyle: scroll ? [styles.justifyCenter, styles.scroll, {justifyContent: 'space-between'}] : null,
            bounces: scroll ? false : null,
        };

        return (
            <ViewType {...props} onLayout={this.onLayout}>
                {children}
            </ViewType>
        );
    }
}
