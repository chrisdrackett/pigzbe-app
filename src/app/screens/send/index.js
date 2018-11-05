import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {strings} from 'app/constants';
import Button from 'app/components/button';
import Form from './form';
import Progress from 'app/components/progress';
import StepModule from 'app/components/step-module';
import {ViewAddress} from 'app/screens/view-address';
import ReactModal from 'react-native-modal';
import {wolloSendReset} from 'app/actions';

export class Send extends Component {
    state = {
        review: false,
        showViewAdressModal: false,
    }

    onBack = () => this.props.navigation.goBack()

    onReset = () => {
        this.setState({review: false, showViewAdressModal: false});
        this.props.dispatch(wolloSendReset());
    }

    onFinish = () => {
        this.onReset();
        this.props.navigation.goBack();
    }

    onReview = review => this.setState({review})

    onViewAddress = () => this.setState({showViewAdressModal: true})

    onHideAddress = () => this.setState({showViewAdressModal: false})

    render() {
        const {dispatch, balance, exchange, sending, sendComplete, sendStatus, error, publicKey} = this.props;

        console.log(this.props);

        return (
            <Fragment>
                <StepModule
                    title={this.state.review ? 'Review Transfer' : 'Transfer Wollo'}
                    icon="transfer"
                    error={error}
                    pad
                    paddingTop={10}
                    keyboardOffset={-50}
                    rightIcon="qrCode"
                    onRightIcon={this.onViewAddress}
                    onBack={this.onBack}
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
                            onPress={this.onFinish}
                        />
                    </Fragment>
                </StepModule>
                <Progress
                    open={sending || sendComplete || error}
                    complete={sendComplete}
                    title={(error || sendComplete) ? null : 'In progress'}
                    error={error}
                    text={sendStatus}
                    buttonLabel={strings.transferProgressButtonLabel}
                    onPress={error ? this.onReset : this.onFinish}
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
