import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, Animated} from 'react-native';
import Icon from 'app/components/icon';
import styles from './styles';

export default class Alert extends Component {
    state = {
        prevType: null,
        prevMessage: null,
    }

    componentWillMount() {
        this._timeoutId = null;
        this._isVisible = new Animated.Value(this.props.message ? 1 : 0);
        this._height = 80;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.message !== this.props.message || prevProps.type !== this.props.type) {
            this.setState({
                prevType: prevProps.type,
                prevMessage: prevProps.message,
            });

            if (this._timeoutId) {
                clearTimeout(this._timeoutId);
                this._timeoutId = null;
            }
            if (this.props.onDismiss) {
                this._timeoutId = setTimeout(() => {
                    this.props.onDismiss();
                }, 3000);
            }
        }

        Animated.timing(this._isVisible, {
            toValue: this.props.message ? 1 : 0,
            duration: 300,
        }).start();
    }

    componentWillUnmount() {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
            this._timeoutId = null;
        }
    }

    onLayout = event => {
        this._height = Math.max(this._height, event.nativeEvent.layout.height + 2);
    }

    render() {
        const type = this.props.type || this.state.prevType;
        const message = this.props.message || this.state.prevMessage;

        return (
            <Animated.View style={[styles.alert, type ? styles[`alert__${type}`] : null, {
                top: this._isVisible.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-this._height, 0],
                }),
            }]} onLayout={this.onLayout}>
                <Text style={styles.message}>{message}</Text>
                {!!this.props.onDismiss &&
                    <View style={styles.dismiss}>
                        <TouchableOpacity style={styles.close} onPress={this.props.onDismiss}>
                            <Icon style={styles.closeIcon} name="cross" />
                        </TouchableOpacity>
                    </View>
                }
            </Animated.View>
        );
    }
}
