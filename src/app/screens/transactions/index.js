import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Payments from '../../components/payments';
import StepModule from '../../components/step-module';
import FundingMessage from 'app/components/funding-message';

export class Transfer extends Component {
    state = {
        showFundingMessage: false,
    }

    onBack = () => this.props.navigation.goBack()

    onCloseFundingMessage = () => this.setState({showFundingMessage: false})

    render() {
        const {balanceXLM, hasGas} = this.props;

        return (
            <Fragment>
                <StepModule
                    title="Transactions"
                    icon="transfer"
                    onBack={this.onBack}
                    customTitle="Transactions"
                >
                    <Payments
                        navigation={this.props.navigation}
                        showHelp={!hasGas}
                    />
                </StepModule>
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
