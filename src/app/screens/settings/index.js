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
            <View style={styles.outer}>
                <ScrollView bounces={false} style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
                    <Container body>
                        <KeyboardAvoid>
                            <View>
                                <Header/>
                                <Text style={styles.title}>{'Settings'}</Text>
                            </View>
                        </KeyboardAvoid>
                        <View>
                            <Button
                                label={'Back'}
                                onPress={this.onBack}
                            />
                            <Button
                                label={'Claim Your Wollo'}
                                onPress={this.onClaim}
                            />
                            <Button
                                label={'View Escrow'}
                                onPress={this.onEscrow}
                            />
                            <Text style={styles.title}>{'enableTouchId: '}{enableTouchId ? 'Yes' : 'No'}</Text>
                            <Text style={styles.title}>{'subscribe: '}{subscribe ? 'Yes' : 'No'}</Text>
                            <Text style={styles.title}>{'email: '}{email}</Text>
                            <Text style={styles.title}>{'phone: '}{phone}</Text>
                            <Text style={styles.title}>{'country: '}{country}</Text>
                            <Button
                                label={strings.accountLogoutButtonLabel}
                                plain
                                onPress={this.onLogout}
                            />
                            <Button
                                label={strings.accountPrivacyButtonLabel}
                                plain
                                onPress={this.onPrivacy}
                            />
                        </View>
                    </Container>
                </ScrollView>
            </View>
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
