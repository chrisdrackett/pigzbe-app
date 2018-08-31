import React, {Component, Fragment} from 'react';
import {TextInput, Text, View, Animated} from 'react-native';
import styles from './styles';
import {color} from '../../styles';
import isAndroid from '../../utils/is-android';

const padding = isAndroid ? 11 : 0;
const paddingMulti = isAndroid ? 11 : 8;

const getHeight = (numberOfLines, margin = 0) => 24 + (21 * numberOfLines) + margin;

const defaultHeight = 60;

const getStyle = (error, height, borderRadius, style) => {
    let s = [styles.input, {
        //borderRadius: numberOfLines > 1 ? 5 : (height / 2),
        //paddingTop: numberOfLines > 1 ? paddingMulti : padding,

        //height: getHeight(numberOfLines),
        height: height ? height : defaultHeight, //getHeight(numberOfLines, 10),
        borderRadius: borderRadius ? borderRadius : (defaultHeight / 2),
    }];

    if (error) {
        s = s.concat(styles.error);
    }

    if (style) {
        s = s.concat(style);
    }

    return s;
};

export default class TextInputComponent extends Component {
    componentWillMount() {
        this._animatedIsFocused = new Animated.Value(this.props.placeholderTop ? 1 : 0);
    }
    componentDidUpdate() {
        Animated.timing(this._animatedIsFocused, {
            toValue: this.props.placeholderTop ? 1 : 0,
            duration: 200,
        }).start();
    }
    render() {
        const {
            children,
            placeholder,
            error = false,
            label,
            height,
            borderRadius,
            style,
            placeholderTop = false,
        } = this.props;

        return (
            <Fragment>
                {label && (
                    <Text style={styles.label}>
                        {label}
                    </Text>
                )}
                <View style={getStyle(error, height, borderRadius, style)}>
                    {placeholder &&
                        <Animated.Text style={[styles.placeholder, {
                            top: this._animatedIsFocused.interpolate({
                                inputRange: [0, 1],
                                outputRange: [18, 10],
                            }),
                            fontSize: this._animatedIsFocused.interpolate({
                                inputRange: [0, 1],
                                outputRange: [14, 9],
                            }),
                            opacity: this._animatedIsFocused.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.6, 1],
                            }),
                        }, this.props.placeholderTop ? {fontWeight: 'normal'} : {}]}>
                            {placeholder}
                        </Animated.Text>
                    }
                    {children}
                </View>
                
            </Fragment>
        );
    }
}
