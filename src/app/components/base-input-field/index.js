import React, {Component, Fragment} from 'react';
import {TextInput, Text, View, Animated} from 'react-native';
import styles from './styles';
import {color} from '../../styles';
import isAndroid from '../../utils/is-android';

const defaultHeight = 50;

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
            showTopPlaceholder = true,
        } = this.props;


        let inputStyles = [styles.input, {
            height: height ? height : defaultHeight,
            borderRadius: borderRadius ? borderRadius : (defaultHeight / 2),
        }];
        if (error) {
            inputStyles = inputStyles.concat(styles.error);
        }
        if (style) {
            inputStyles = inputStyles.concat(style);
        }

        return (
            <View style={styles.container}>
                {label && (
                    <Text style={styles.label}>
                        {label}
                    </Text>
                )}
                <View style={inputStyles}>
                    {placeholder && (!placeholderTop || showTopPlaceholder) &&
                        <Animated.Text style={[styles.placeholder, {
                            top: this._animatedIsFocused.interpolate({
                                inputRange: [0, 1],
                                outputRange: [(defaultHeight/2) - 11, (defaultHeight/2) - 18],
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
                {typeof error  === "string" &&
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                }
                
            </View>
        );
    }
}
