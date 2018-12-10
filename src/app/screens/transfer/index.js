import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {strings, SCREEN_DASHBOARD, CURRENCIES} from 'app/constants';
import Button from 'app/components/button';
import Progress from 'app/components/progress';
import StepModule from 'app/components/step-module';
import {walletSendReset, sendTokens, stayLoggedIn} from 'app/actions';
import Form from './form';
import Review from './review';
import ViewAddress from '../view-address';
import ReactModal from 'react-native-modal';

export class Transfer extends Component {
    state = {
        review: false,
        destination: '',
        amount: '',
        memo: '',
        showViewAdressModal: false,
    }

    onFocus = () => this.props.dispatch(stayLoggedIn(true));

    onBlur = () => {
        console.log('Transfer.onBlur');
        this.props.dispatch(stayLoggedIn(false));
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('willFocus', this.onFocus);
        this.blurListener = this.props.navigation.addListener('willBlur', this.onBlur);
        this.props.dispatch(stayLoggedIn(true));
    }

    componentWillUnMount() {
        this.focusListener.remove();
        this.blurListener.remove();
        this.props.dispatch(stayLoggedIn(false));
    }

    onReset = () => {
        this.setState({
            review: false,
            destination: '',
            amount: '',
            memo: '',
        });
        this.props.dispatch(walletSendReset());
    }

    onSend = () => {
        const {destination, amount, memo} = this.state;
        const {selectedToken} = this.props;

        this.props.dispatch(sendTokens(selectedToken, destination, amount, memo));
    }

    onFinish = () => {
        this.onReset();
        this.props.navigation.navigate(SCREEN_DASHBOARD);
    }

    onReview = props => this.setState({review: true, ...props})

    onEdit = () => this.setState({review: false})

    onViewAddress = () => this.setState({showViewAdressModal: true})

    onHideAddress = () => this.setState({showViewAdressModal: false})

    render() {
        const {sending, sendComplete, sendStatus, error, selectedToken} = this.props;

        const token = CURRENCIES[selectedToken];

        return (
            <Fragment>
                <StepModule
                    title={this.state.review ? 'Review Transfer' : `Transfer ${token.name}`}
                    icon="transfer"
                    error={error}
                    pad
                    paddingTop={10}
                    keyboardOffset={-50}
                    rightIcon="qrCode"
                    onRightIcon={this.onViewAddress}
                    tokenSelector={true}
                >
                    {this.state.review ? (
                        <Fragment>
                            <Review
                                destination={this.state.destination}
                                amount={this.state.amount}
                                memo={this.state.memo}
                                onEdit={this.onEdit}
                                onSend={this.onSend}
                            />
                            <Button
                                theme="outline"
                                label={strings.transferCancelButtonLabel}
                                onPress={this.onReset}
                            />
                        </Fragment>
                    ) : (
                        <Form
                            destination={this.state.destination}
                            amount={this.state.amount}
                            memo={this.state.memo}
                            onReview={this.onReview}
                        />
                    )}
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
        selectedToken: state.wallet.selectedToken,
        error: state.wallet.error,
        sending: state.wallet.sending,
        sendStatus: state.wallet.sendStatus,
        sendComplete: state.wallet.sendComplete,
        publicKey: state.keys.publicKey,
    })
)(Transfer);
