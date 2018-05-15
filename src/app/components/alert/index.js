import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import styles from './styles';
import Button from '../button';

const getErrorDetail = error => {
    if (!error) {
        return 'Error';
    }
    // console.error(error.data ? error.data.extras.result_codes.transaction : error);

    if (error.message && error.message.title) {
        return `Error: ${error.message.title}`;
    }

    if (error.message) {
        return `Error: ${error.message}`;
    }

    return 'Error';
};

class Alert extends Component {
    state = {
        dismissed: false,
        prevError: null
    }

    dismiss() {
        const {error, onDismiss} = this.props;

        this.setState({
            prevError: error,
            dismissed: true
        });

        onDismiss();
    }

    render() {
        const {prevError, dismissed} = this.state;
        const {error} = this.props;
        const showError = !dismissed || prevError !== error;

        if (error && showError) {
            return (
                <View style={styles.error}>
                    <Text style={styles.message}>{getErrorDetail(error)}</Text>
                    <View style={styles.dismiss}>
                        <Button
                            label={'dismiss'}
                            plain
                            onPress={() => this.dismiss()}
                        />
                    </View>
                </View>
            );
        }
        return null;
    }
}

export default Alert;
