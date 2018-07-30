import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {
    settingsClear,
    // settingsUpdate,
    settingsEnableTouchId,
    settingsToggleSubscribe,
    authLogout
} from '../../actions';
import Button from '../../components/button';
import {
    strings,
    SCREEN_BALANCE,
    SCREEN_CLAIM,
    SCREEN_ESCROW,
    PRIVACY_URL
} from '../../constants';
import openURL from '../../utils/open-url';
import StepModule from '../../components/step-module';
import Paragraph from '../../components/paragraph';
import Checkbox from '../../components/checkbox';

export class Settings extends Component {
    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE)

    onClaim = () => this.props.navigation.navigate(SCREEN_CLAIM)

    onEscrow = () => this.props.navigation.navigate(SCREEN_ESCROW)

    onSubscribe = () => this.props.dispatch(settingsToggleSubscribe(!this.props.subscribe));

    onEnableTouchId = () => this.props.dispatch(settingsEnableTouchId(!this.props.enableTouchId));

    onLogout = () => {
        this.props.dispatch(authLogout());
        this.props.dispatch(settingsClear());
    }

    onPrivacy = () => openURL(PRIVACY_URL)

    render() {
        const {
            enableTouchId,
            subscribe,
            email,
            phone,
            country,
            escrow,
        } = this.props;

        return (
            <StepModule
                title={'Settings'}
                icon="settings"
                onBack={this.onBack}
                pad
                paddingTop={20}
            >
                <View>
                    <Button
                        label={'Claim Your Wollo'}
                        onPress={this.onClaim}
                    />
                    {escrow && (
                        <Button
                            label={'View Escrow'}
                            onPress={this.onEscrow}
                        />
                    )}
                    <Checkbox
                        text={'Enable Touch Id'}
                        value={enableTouchId}
                        onValueChange={this.onEnableTouchId}
                    />
                    <Checkbox
                        text={strings.accountMailingListOptIn}
                        value={subscribe}
                        onValueChange={this.onSubscribe}
                    />
                    <Paragraph>{'enableTouchId: '}{enableTouchId ? 'Yes' : 'No'}</Paragraph>
                    <Paragraph>{'subscribe: '}{subscribe ? 'Yes' : 'No'}</Paragraph>
                    <Paragraph>{'email: '}{email}</Paragraph>
                    <Paragraph>{'phone: '}+{country}{phone}</Paragraph>
                    <Button
                        label={strings.accountLogoutButtonLabel}
                        onPress={this.onLogout}
                    />
                    <Button
                        theme="plain"
                        label={strings.accountPrivacyButtonLabel}
                        onPress={this.onPrivacy}
                    />
                </View>
            </StepModule>
        );
    }
}

export default connect(
    state => ({
        enableTouchId: state.settings.enableTouchId,
        subscribe: state.settings.subscribe,
        email: state.settings.email,
        phone: state.settings.phone,
        country: state.settings.country,
        escrow: state.escrow.escrowPublicKey,
    })
)(Settings);
