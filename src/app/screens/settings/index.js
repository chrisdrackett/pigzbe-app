import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, ScrollView} from 'react-native';
import {
    settingsClear,
    authLogout
} from '../../actions';
import styles from './styles';
import {color} from '../../styles';
import Button from '../../components/button';
import Header from '../../components/header';
import Container from '../../components/container';
import KeyboardAvoid from '../../components/keyboard-avoid';
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

export class Settings extends Component {
    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE)

    onClaim = () => this.props.navigation.navigate(SCREEN_CLAIM)

    onEscrow = () => this.props.navigation.navigate(SCREEN_ESCROW)

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
        } = this.props;

        return (
            <StepModule
                title={'Settings'}
                icon="settings"
                scroll={true}
                onBack={this.onBack}
                pad
            >
                <View>
                    <Button
                        secondary
                        label={'Claim Your Wollo'}
                        onPress={this.onClaim}
                    />
                    <Button
                        label={'View Escrow'}
                        onPress={this.onEscrow}
                    />
                    <Paragraph>{'enableTouchId: '}{enableTouchId ? 'Yes' : 'No'}</Paragraph>
                    <Paragraph>{'subscribe: '}{subscribe ? 'Yes' : 'No'}</Paragraph>
                    <Paragraph>{'email: '}{email}</Paragraph>
                    <Paragraph>{'phone: '}{phone}</Paragraph>
                    <Paragraph>{'country: '}{country}</Paragraph>
                    <Button
                        label={strings.accountLogoutButtonLabel}
                        secondary
                        onPress={this.onLogout}
                    />
                    <Button
                        label={strings.accountPrivacyButtonLabel}
                        secondary
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
    })
)(Settings);
