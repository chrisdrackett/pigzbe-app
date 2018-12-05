import React, {Component} from 'react';
import Button from '../../components/button';
import {SCREEN_SETTINGS, SCREEN_CLAIM_ICO, SCREEN_CLAIM_VIP, SCREEN_CLAIM_AIRDROP} from '../../constants';
import StepModule from '../../components/step-module';

export default class Claim extends Component {
    onBack = () => this.props.navigation.navigate(SCREEN_SETTINGS)

    onICO = () => this.props.navigation.navigate(SCREEN_CLAIM_ICO)

    onAirdropBounty = () => this.props.navigation.navigate(SCREEN_CLAIM_AIRDROP)

    onVIPs = () => this.props.navigation.navigate(SCREEN_CLAIM_VIP)

    render() {
        return (
            <StepModule
                title={'Claim Your Wollo'}
                content={'If you’re an ICO, Airdrop, Bounty or VIP participant, you can now claim your Wollo. Please make your choice below.'}
                icon="coins"
                onBack={this.onBack}
                justify="flex-end"
                pad
            >
                <Button
                    theme="outline"
                    label={'Purchase via Eidoo ICO'}
                    onPress={this.onICO}
                />
                <Button
                    theme="outline"
                    label={'Airdrop / Bounty'}
                    onPress={this.onAirdropBounty}
                />
                <Button
                    theme="outline"
                    label={'VIPs'}
                    onPress={this.onVIPs}
                />
            </StepModule>
        );
    }
}
