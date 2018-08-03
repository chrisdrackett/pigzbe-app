import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {strings, SCREEN_TRANSFER} from '../../constants';
import Button from '../../components/button';
import Form from './form';
import Progress from '../../components/progress';
import StepModule from '../../components/step-module';

export class Send extends Component {
    state = {
        review: false
    }

    onTransfer = () => this.props.navigation.navigate(SCREEN_TRANSFER)

    onReview = review => this.setState({review})

    render() {
        const {dispatch, balance, exchange, sending, sendComplete, sendStatus, error} = this.props;

        return (
            <Fragment>
                <StepModule
                    title={this.state.review ? 'Review Transfer' : 'Transfer Wollo'}
                    icon="transfer"
                    error={error}
                    pad
                    paddingTop={10}
                    keyboardOffset={-50}
                >
                    <Fragment>
                        <Form
                            dispatch={dispatch}
                            exchange={exchange}
                            balance={balance}
                            onReview={this.onReview}
                        />
                        <Button
                            theme="outline"
                            label={strings.transferCancelButtonLabel}
                            onPress={this.onTransfer}
                        />
                    </Fragment>
                </StepModule>
                <Progress
                    active={sending}
                    complete={sendComplete}
                    title={sendComplete ? 'Transfer complete' : 'Transfer in progress'}
                    error={error}
                    text={sendStatus}
                    buttonLabel={strings.transferProgressButtonLabel}
                    onPress={this.onTransfer}
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        error: state.wollo.error,
        balance: state.wollo.balance,
        exchange: state.coins.exchange,
        sending: state.wollo.sending,
        sendStatus: state.wollo.sendStatus,
        sendComplete: state.wollo.sendComplete,
    })
)(Send);
