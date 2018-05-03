import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {
    profileUpdate,
    profileAvailable
} from '../../actions';
import styles from './styles';
import Button from '../button';
import Loader from '../loader';
import BaseView from '../base-view';
import {
    strings,
    SCREEN_BALANCE
} from '../../constants';

class Escrow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            email: props.email,
            image: props.image,
            subscribe: props.subscribe,
            validName: true,
            validEmail: true,
            isUpdating: false
        };
    }

    render() {
        const {
            dispatch,
            error,
            navigation,
            escrow
        } = this.props;

        const {
            isUpdating
        } = this.state;

        return (
            <BaseView scrollViewStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Escrow
                    </Text>
                    <Text style={styles.title}>
                        transactions: {escrow.transactions.length}
                    </Text>
                    <Button
                        label={'Back'}
                        onPress={() => navigation.navigate(SCREEN_BALANCE)}
                    />
                </View>
                <Loader
                    isLoading={isUpdating}
                />
            </BaseView>
        );
    }
}

export const EscrowComponent = Escrow;

export default connect(
    state => ({
        escrow: state.wollo.escrow
    })
)(Escrow);
