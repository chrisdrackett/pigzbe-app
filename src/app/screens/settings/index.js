import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {
    loadEscrow,
    // settingsClear,
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
    PRIVACY_URL,
    SCREEN_CHANGE_PASSCODE
} from '../../constants';
import openURL from '../../utils/open-url';
import StepModule from '../../components/step-module';
// import Paragraph from '../../components/paragraph';
import Checkbox from '../../components/checkbox';

export class Settings extends Component {
    componentWillMount() {
        this.props.dispatch(loadEscrow());
    }

    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE)

    onClaim = () => this.props.navigation.navigate(SCREEN_CLAIM)

    onEscrow = () => this.props.navigation.navigate(SCREEN_ESCROW)

    onSubscribe = () => this.props.dispatch(settingsToggleSubscribe(!this.props.subscribe));

    onEnableTouchId = () => this.props.dispatch(settingsEnableTouchId(!this.props.enableTouchId));

    onLogout = () => {
        this.props.dispatch(authLogout());
        // this.props.dispatch(settingsClear());
    }

    onPrivacy = () => openURL(PRIVACY_URL)

    onChangePasscode = () => this.props.navigation.navigate(SCREEN_CHANGE_PASSCODE)

    render() {
        const {
            touchIdSupport,
            enableTouchId,
            subscribe,
            // email,
            // phone,
            // country,
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
                    {escrow && (
                        <Button
                            label={'View Escrow'}
                            onPress={this.onEscrow}
                        />
                    )}
                    <Button
                        label={'Claim Your Wollo'}
                        onPress={this.onClaim}
                        style={{marginBottom: 30}}
                    />
                    {touchIdSupport && (
                        <Checkbox
                            alt
                            text={touchIdSupport === 'FaceID' ? 'Enable Face ID' : 'Enable Touch ID'}
                            value={enableTouchId}
                            onValueChange={this.onEnableTouchId}
                        />
                    )}
                    <Checkbox
                        alt
                        text={strings.accountMailingListOptIn}
                        value={subscribe}
                        onValueChange={this.onSubscribe}
                    />
                    {/* <Paragraph>{'touchIdSupport: '}{touchIdSupport}</Paragraph> */}
                    {/* <Paragraph>{'enableTouchId: '}{enableTouchId ? 'Yes' : 'No'}</Paragraph> */}
                    {/* <Paragraph>{'subscribe: '}{subscribe ? 'Yes' : 'No'}</Paragraph> */}
                    {/* <Paragraph>{'email: '}{email}</Paragraph> */}
                    {/* <Paragraph>{'phone: '}+{country}{phone}</Paragraph> */}
                    <Button
                        theme="outline"
                        label={'Change passcode'}
                        onPress={this.onChangePasscode}
                        style={{marginTop: 20}}
                    />
                    <Button
                        theme="outline"
                        label={strings.accountLogoutButtonLabel}
                        onPress={this.onLogout}
                        // style={{marginTop: 30}}
                    />
                    {/* <Button
                        theme="plain"
                        label={strings.accountPrivacyButtonLabel}
                        onPress={this.onPrivacy}
                    /> */}
                </View>
            </StepModule>
        );
    }
}

export default connect(
    state => ({
        touchIdSupport: state.auth.touchIdSupport,
        enableTouchId: state.settings.enableTouchId,
        subscribe: state.settings.subscribe,
        email: state.settings.email,
        phone: state.settings.phone,
        country: state.settings.country,
        escrow: state.escrow.escrowPublicKey,
    })
)(Settings);
