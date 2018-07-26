import React, {Component} from 'react';
import {View} from 'react-native';
import Button from '../../components/button';
// import {strings} from '../../constants';
import {SCREEN_SETTINGS, SCREEN_CLAIM_ICO} from '../../constants';
import StepModule from '../../components/step-module';

export default class Claim extends Component {
    onBack = () => this.props.navigation.navigate(SCREEN_SETTINGS)

    onICO = () => this.props.navigation.navigate(SCREEN_CLAIM_ICO)

    onAirdropBounty = () => {}

    onVIPs = () => {}

    render() {
        return (
            <StepModule
                title={'Claim Your Wollo'}
                text={'If you’re an ICO, Airdrop, Bounty or VIP participant, you can now claim your Wollo. Please make your choice below:'}
                icon="coins"
                scroll={false}
                onBack={this.onBack}
                pad
            >
                <View>
                    <Button
                        secondary
                        label={'Purchase via Eidoo ICO'}
                        onPress={this.onICO}
                    />
                    <Button
                        secondary
                        label={'Airdrop / Bounty'}
                        onPress={this.onAirdropBounty}
                    />
                    <Button
                        secondary
                        label={'VIPs'}
                        onPress={this.onVIPs}
                    />
                </View>
            </StepModule>
        );
    }
}
