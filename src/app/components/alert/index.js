import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import Button from '../button';
import {strings} from '../../constants';

const getErrorDetail = error => {
    if (!error) {
        return strings.errorUnknown;
    }
    // console.error(error.data ? error.data.extras.result_codes.transaction : error);

    if (error.message && error.message.title) {
        return `${strings.errorMessageStart} ${error.message.title}`.trim();
    }

    if (error.message) {
        return `${strings.errorMessageStart} ${error.message}`.trim();
    }

    return strings.errorUnknown;
};

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
            console.log(error);
            return (
                <View style={styles.error}>
                    <Text style={styles.message}>{getErrorDetail(error)}</Text>
                    <View style={styles.dismiss}>
                        <Button
                            theme="plain_light"
                            label={strings.errorDismiss}
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
