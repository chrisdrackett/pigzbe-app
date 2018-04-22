import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import styles from './styles';
import Button from '../button';

class Alert extends Component {
    state = {
        dismissed: false,
        prevError: null
    }

    dismiss() {
        const {error} = this.props;

        this.setState({
            prevError: error,
            dismissed: true
        });
    }

    render() {
        const {prevError, dismissed} = this.state;
        const {error} = this.props;
        const showError = !dismissed || prevError !== error;

        if (error && showError) {
            return (
                <View style={styles.error}>
                    <Text style={styles.message}>{error.message}</Text>
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
