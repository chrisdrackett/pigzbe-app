import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {strings} from '../../constants';
import Button from '../../components/button';
import Form from './form';
import Progress from '../../components/progress';
import StepModule from '../../components/step-module';
import {ViewAddress} from '../view-address';
import ReactModal from 'react-native-modal';

export class Send extends Component {
    state = {
        review: false,
        showViewAdressModal: false,
    }

    onTransfer = () => this.props.navigation.goBack()

    onReview = review => this.setState({review})

    onViewAddress = () => this.setState({showViewAdressModal: true})

    onHideAddress = () => this.setState({showViewAdressModal: false})

    render() {
        const {dispatch, balance, exchange, sending, sendComplete, sendStatus, error, publicKey} = this.props;

        return (
            <Fragment>
                <StepModule
                    title={this.state.review ? 'Review Transfer' : 'Transfer Wollo'}
                    icon="transfer"
                    error={error}
                    pad
                    paddingTop={10}
                    keyboardOffset={-50}
                    settingsIcon="qrCode"
                    onSettings={this.onViewAddress}
                    onBack={() => this.props.navigation.goBack()}
                >
                    <Fragment>
                        <Form
                            dispatch={dispatch}
                            exchange={exchange}
                            balance={balance}
                            onReview={this.onReview}
                            publicKey={publicKey}
                        />
                        <Button
                            theme="outline"
                            label={strings.transferCancelButtonLabel}
                            onPress={this.onTransfer}
                        />
                    </Fragment>
                </StepModule>
                <Progress
                    open={sending}
                    complete={sendComplete}
                    title={sendComplete ? 'Transfer complete' : 'Transfer in progress'}
                    error={error}
                    text={sendStatus}
                    buttonLabel={strings.transferProgressButtonLabel}
                    onPress={this.onTransfer}
                />
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
        exchange: state.exchange.exchange,
        sending: state.wollo.sending,
        sendStatus: state.wollo.sendStatus,
        sendComplete: state.wollo.sendComplete,
        publicKey: state.keys.publicKey,
    })
)(Send);
