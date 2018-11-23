import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {strings, SCREEN_DASHBOARD} from 'app/constants';
import Button from 'app/components/button';
import Progress from 'app/components/progress';
import StepModule from 'app/components/step-module';
import {wolloSendReset, sendWollo} from 'app/actions';
import Form from './form';
import Review from './review';

export class Transfer extends Component {
    state = {
        review: false,
        destination: '',
        amount: '',
        memo: '',
    }

    onReset = () => {
        this.setState({
            review: false,
            destination: '',
            amount: '',
            memo: '',
        });
        this.props.dispatch(wolloSendReset());
    }

    onSend = () => {
        const {destination, amount, memo} = this.state;

        this.props.dispatch(sendWollo(destination, amount, memo));
    }

    onFinish = () => {
        this.onReset();
        this.props.navigation.navigate(SCREEN_DASHBOARD);
    }

    onReview = props => this.setState({review: true, ...props})

    onEdit = () => this.setState({review: false})

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
                    customTitle="Transfer"
                >
                    {this.state.review ? (
                        <Fragment>
                            <Review
                                dispatch={dispatch}
                                exchange={exchange}
                                balance={balance}
                                publicKey={publicKey}
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
                            dispatch={dispatch}
                            exchange={exchange}
                            balance={balance}
                            publicKey={publicKey}
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
)(Transfer);
