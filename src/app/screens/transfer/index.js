import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import styles from './styles';
import {
    strings,
    SCREEN_SEND
} from '../../constants';
import Button from '../../components/button';
import Payments from '../../components/payments';
import {wolloError} from '../../actions';
import StepModule from '../../components/step-module';
import {ViewAddress} from '../view-address';
import ReactModal from 'react-native-modal';

export class Transfer extends Component {
    state = {
        showViewAdressModal: false,
    }

    onViewAddress = () => this.setState({showViewAdressModal: true})

    onHideAddress = () => this.setState({showViewAdressModal: false})

    onTransfer = () => {
        const {hasGas, balanceXLM, minXLM} = this.props;

        if (!hasGas) {
            const errMsg = `${strings.transferErrorNoGas} (Balance ${balanceXLM}XLM. Required ${minXLM}XLM)`;
            this.props.dispatch(wolloError(new Error(errMsg)));
            return;
        }
        this.props.navigation.push(SCREEN_SEND);
    }

    render() {
        const {error, balance, hasGas} = this.props;

        return (
            <Fragment>
                <StepModule
                    title="Transfer"
                    icon="transfer"
                    error={error}
                    scroll={false}
                    settingsIcon="qrCode"
                    onSettings={this.onViewAddress}
                >
                    <Payments
                        navigation={this.props.navigation}
                        showHelp={parseFloat(balance) === 0}
                    />
                </StepModule>
                <View style={styles.button}>
                    <Button
                        label={strings.transferButtonLabel}
                        onPress={this.onTransfer}
                        disabled={!hasGas || !Number(balance)}
                    />
                </View>
                <ReactModal
                    isVisible={this.state.showViewAdressModal}
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    style={{margin: 0}}
                    onBackButtonPress={this.onHideAddress}
                >
                    <ViewAddress
                        publicKey={this.props.publicKey}
                        onBack={this.onHideAddress}
                    />
                </ReactModal>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        error: state.wollo.error,
        balance: state.wollo.balance,
        balanceXLM: state.wollo.balanceXLM,
        minXLM: state.wollo.minXLM,
        hasGas: state.wollo.hasGas,
        publicKey: state.keys.publicKey,
    })
)(Transfer);
