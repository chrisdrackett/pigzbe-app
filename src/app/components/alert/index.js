import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, Animated} from 'react-native';
import styles from './styles';
import {strings} from '../../constants';

const getErrorDetail = error => {
    if (!error) {
        return strings.errorUnknown;
    }

    if (error.message && error.message.title) {
        return error.message.title;
    }

    if (error.message) {
        return error.message;
    }

    return strings.errorUnknown;
};

export default class Alert extends Component {
    state = {
        dismissed: false,
        prevError: null,
        position: new Animated.Value(-90),
        height: 0,
    }

    componentDidMount() {
        this.onUpdate();
    }

    componentDidUpdate() {
        this.onUpdate();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.error && this.props.error) {
            this.setState({prevError: this.props.error, height: 0});
        }
    }

    onUpdate = () => {
        const {prevError, dismissed, height} = this.state;
        const {error} = this.props;
        const showError = error && (!dismissed || prevError !== error);
        const toValue = showError ? -10 : -height;

        Animated.timing(this.state.position, {
            toValue,
            duration: 300,
        }).start();
    }

    dismiss = () => {
        const {error} = this.props;

        this.setState({
            prevError: error,
            dismissed: true,
            height: 0,
        });
    }

    onLayout = event => {
        if (!this.state.height) {
            this.setState({height: event.nativeEvent.layout.height + 2});
        }
    }

    render() {
        const error = this.props.error || this.state.prevError;

        return (
            <Animated.View style={[styles.error, {top: this.state.position}]} onLayout={this.onLayout}>
                <Text style={styles.message}>{getErrorDetail(error)}</Text>
                <View style={styles.dismiss}>
                    <TouchableOpacity style={styles.close} onPress={this.dismiss}>
                        <Image style={styles.closeIcon} source={require('./images/close.png')} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }
}
