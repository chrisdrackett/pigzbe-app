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
import StepModule from '../../components/step-module';
import {ViewAddress} from '../view-address';
import ReactModal from 'react-native-modal';
import FundingMessage from 'app/components/funding-message';

export class Transfer extends Component {
    state = {
        showViewAdressModal: false,
        showFundingMessage: false,
    }

    onViewAddress = () => this.setState({showViewAdressModal: true})

    onHideAddress = () => this.setState({showViewAdressModal: false})

    onTransfer = () => {
        const {hasGas} = this.props;

        if (!hasGas) {
            this.setState({showFundingMessage: true});
            return;
        }
        this.props.navigation.push(SCREEN_SEND);
    }

    onCloseFundingMessage = () => this.setState({showFundingMessage: false})

    render() {
        const {balance, balanceXLM, hasGas} = this.props;
        const hasBalance = parseFloat(balance) > 0;

        return (
            <Fragment>
                <StepModule
                    title="Transfer"
                    icon="transfer"
                    // error={error}
                    rightIcon="qrCode"
                    onRightIcon={this.onViewAddress}
                >
                    <Payments
                        navigation={this.props.navigation}
                        showHelp={!hasGas}
                        spacingBottom={true}
                    />
                </StepModule>
                {hasBalance && (
                    <View style={styles.button}>
                        <Button
                            label={strings.transferButtonLabel}
                            onPress={this.onTransfer}
                            // disabled={!hasGas || !hasBalance}
                            disabled={!hasBalance}
                        />
                    </View>
                )}
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
                <FundingMessage
                    fundingType={FundingMessage.TRANSFER}
                    open={this.state.showFundingMessage}
                    balanceXLM={balanceXLM}
                    onClose={this.onCloseFundingMessage}
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        balance: state.wollo.balance,
        balanceXLM: state.wollo.balanceXLM,
        minXLM: state.wollo.minXLM,
        hasGas: state.wollo.hasGas,
        publicKey: state.keys.publicKey,
    })
)(Transfer);
