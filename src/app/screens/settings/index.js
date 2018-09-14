import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import {
    loadEscrow,
    // settingsClear,
    // settingsUpdate,
    settingsEnableTouchId,
    settingsToggleSubscribe,
    authLogout,
    setBaseCurrency,
} from '../../actions';
import Button from '../../components/button';
import SelectInput from '../../components/select-input';
import {
    strings,
    SCREEN_BALANCE,
    SCREEN_CLAIM,
    //SCREEN_CLAIM_ICO,
    SCREEN_ESCROW,
    PRIVACY_URL,
    SCREEN_CHANGE_PASSCODE,
    SCREEN_SET_EMAIL,
    CURRENCIES,
} from '../../constants';
import openURL from '../../utils/open-url';
import StepModule from '../../components/step-module';
import Container from '../../components/container';
// import Paragraph from '../../components/paragraph';
import Checkbox from '../../components/checkbox';

import styles from './styles';

const currenciesForSelect = {};
Object.keys(CURRENCIES).forEach(key => currenciesForSelect[key] = CURRENCIES[key].name);

export class Settings extends Component {
    componentWillMount() {
        this.props.dispatch(loadEscrow());
    }

    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE)

    onClaim = () => this.props.navigation.navigate(SCREEN_CLAIM)
    //onClaim = () => this.props.navigation.navigate(SCREEN_CLAIM_ICO)

    onEscrow = () => this.props.navigation.navigate(SCREEN_ESCROW)

    onSubscribe = () => this.props.dispatch(settingsToggleSubscribe(!this.props.subscribe));

    onSetTouchId = enabled => this.props.dispatch(settingsEnableTouchId(enabled));

    onLogout = () => {
        this.props.dispatch(authLogout());
        // this.props.dispatch(settingsClear());
    }

    onPrivacy = () => openURL(PRIVACY_URL)

    onChangePasscode = () => this.props.navigation.navigate(SCREEN_CHANGE_PASSCODE)

    onChangeEmail = () => this.props.navigation.navigate(SCREEN_SET_EMAIL)

    onChangeBaseCurrency = baseCurrency => this.props.dispatch(setBaseCurrency(baseCurrency))

    render() {
        const {
            touchIdSupport,
            enableTouchId,
            subscribe,
            email,
            phone,
            // country,
            escrow,
            baseCurrency,
        } = this.props;

        return (
            <StepModule
                title={'Settings'}
                icon="settings"
                onBack={this.onBack}
                paddingTop={20}
                backgroundColor="transparent"
            >   
                {escrow && (
                    <View style={styles.section}>
                        <Button
                            label={'View Escrow'}
                            onPress={this.onEscrow}
                        />
                    </View>
                )}
                <View style={styles.section}>
                    <Button
                        label={'Claim Your Wollo'}
                        onPress={this.onClaim}
                        style={{marginBottom: 0}}
                    />
                </View>
                <Text style={styles.sectionTitle}>
                    General
                </Text>
                <View style={[styles.section, styles.sectionNoVPadding]}>
                    <View style={[styles.item]}>
                        <TouchableOpacity style={styles.itemInner} onPress={this.onChangeEmail}>
                            <Text style={styles.itemName}>Email</Text>
                            <Text style={styles.itemValue}>{email || 'Not found'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.item]}>
                        <TouchableOpacity style={styles.itemInner}>
                            <Text style={styles.itemName}>Phone</Text>
                            <Text style={styles.itemValue}>{phone ? `+${country} ${phone}` : 'Not found'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.item, styles.itemLast]}>
                        <TouchableOpacity style={styles.itemInner}>
                            <Text style={styles.itemName}>Native Currency</Text>
                            <Text style={styles.itemValue}>{baseCurrency}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.sectionTitle}>
                    Security 
                </Text>
                <View style={[styles.section, styles.sectionNoVPadding]}>
                    {(true || touchIdSupport) && (
                        <View style={[styles.item]}>
                            <TouchableOpacity style={styles.itemInner}>
                                <Text style={styles.itemName}>{touchIdSupport === 'FaceID' ? 'Face' : 'Touch'} ID</Text>
                                <Switch
                                    value={enableTouchId} 
                                    onValueChange={this.onSetTouchId}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    <View style={[styles.item]}>
                        <TouchableOpacity style={styles.itemInner} onPress={this.onChangePasscode}>
                            <Text style={styles.itemName}>Change Passcode</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.item]}>
                        <TouchableOpacity style={styles.itemInner}>
                            <Text style={styles.itemName}>Reset 2-Factor Authentication</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.item, styles.itemLast]}>
                        <TouchableOpacity style={styles.itemInner}>
                            <Text style={styles.itemName}>Reset Ella's Secret Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.sectionTitle}>
                    Other
                </Text>
                <View style={[styles.section, styles.sectionNoVPadding]}>
                    <View style={[styles.item]}>
                        <TouchableOpacity style={styles.itemInner}>
                            <Text style={styles.itemName}>Support</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.item]}>
                        <TouchableOpacity style={styles.itemInner}>
                            <Text style={styles.itemName}>Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.item]}>
                        <TouchableOpacity style={styles.itemInner}>
                            <Text style={styles.itemName}>Terms & Conditions</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.item, styles.itemLast]}>
                        <TouchableOpacity style={styles.itemInner}>
                            <Text style={styles.itemName}>About</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Button
                        theme="outline"
                        label={strings.accountLogoutButtonLabel}
                        onPress={this.onLogout}
                        style={{marginBottom: 0}}
                    />
                </View>

                {false &&
                <View style={styles.section}>
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
                    {/* <Paragraph>{'subscribe: '}{subscribe ? 'Yes' : 'No'}</Paragraph> */}
                    {/* <Paragraph>{'email: '}{email}</Paragraph> */}
                    {/* <Paragraph>{'phone: '}+{country}{phone}</Paragraph> */}

                    <SelectInput
                        value={baseCurrency}
                        placeholder={'Currency'}
                        onChangeSelection={this.onChangeBaseCurrency}
                        options={currenciesForSelect}
                        searchable={false}
                    />

                    
                    {/* <Button
                        theme="plain"
                        label={strings.accountPrivacyButtonLabel}
                        onPress={this.onPrivacy}
                    /> */}
                </View>
                }
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
        baseCurrency: state.wollo.baseCurrency,
    })
)(Settings);
