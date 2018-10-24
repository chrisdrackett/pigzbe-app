import React, {Component} from 'react';
import {SCREEN_CLAIM_AIRDROP_BURN} from 'app/constants';
import ClaimEstimateGas from '../claim-estimate-gas';

export default class EstimateGas extends Component {
    onCancel = () => this.props.navigation.goBack()

    onConfirm = () => this.props.navigation.navigate(SCREEN_CLAIM_AIRDROP_BURN)

    render() {
        return (
            <ClaimEstimateGas
                icon="airdrop"
                onConfirm={this.onConfirm}
                onCancel={this.onCancel}
            />
        );
    }
}
