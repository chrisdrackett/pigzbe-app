import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, Animated} from 'react-native';
import styles from './styles';
import {strings} from '../../constants';

const getErrorDetail = error => {
    // return 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci';
    if (!error) {
        return strings.errorUnknown;
    }
    // console.error(error.data ? error.data.extras.result_codes.transaction : error);

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
    }

    componentDidMount() {
        this.onUpdate();
    }

    componentDidUpdate() {
        this.onUpdate();
    }

    onUpdate = () => {
        const {prevError, dismissed} = this.state;
        const {error} = this.props;
        const showError = error && (!dismissed || prevError !== error);
        const toValue = showError ? -10 : -90;

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
        });
    }

    render() {
        const {error} = this.props;

        return (
            <Animated.View style={[styles.error, {top: this.state.position}]}>
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
