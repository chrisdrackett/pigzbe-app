import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {Alert, View, Text, TouchableOpacity, Switch} from 'react-native';
import {
    loadEscrow,
    // settingsClear,
    // settingsUpdate,
    settingsEnableTouchId,
    settingsToggleSubscribe,
    authLogout,
    authClearKidPasscode
} from '../../actions';
import Button from '../../components/button';
import {
    strings,
    SCREEN_DASHBOARD,
    SCREEN_CLAIM,
    //SCREEN_CLAIM_ICO,
    SCREEN_ESCROW,
    TERMS_URL,
    PRIVACY_URL,
    SUPPORT_URL,
    SCREEN_CHANGE_PASSCODE,
    SCREEN_SET_EMAIL,
    SCREEN_SET_CURRENCY,
    CURRENCIES,
} from '../../constants';
import openURL from '../../utils/open-url';
import StepModule from '../../components/step-module';
import Icon from 'app/components/icon';

import styles from './styles';
import { color } from '../../styles';

const currenciesForSelect = {};
Object.keys(CURRENCIES).forEach(key => (currenciesForSelect[key] = CURRENCIES[key].name));


const Items = ({children}) => (
    <Fragment>
        {React.Children.toArray(children).map((child, index) => (
            <View key={index} style={[styles.item, index === children.length - 1 ? styles.itemLast : null]}>
                {child}
            </View>
        ))}
    </Fragment>
);

export class Settings extends Component {
    componentWillMount() {
        this.props.dispatch(loadEscrow());
    }

    onBack = () => this.props.navigation.goBack()

    onClaim = () => this.props.navigation.navigate(SCREEN_CLAIM)
    //onClaim = () => this.props.navigation.navigate(SCREEN_CLAIM_ICO)

    onEscrow = () => this.props.navigation.navigate(SCREEN_ESCROW)

    onSubscribe = subscribe => this.props.dispatch(settingsToggleSubscribe(subscribe));

    onSetTouchId = enabled => this.props.dispatch(settingsEnableTouchId(enabled));

    onLogout = () => {
        this.props.dispatch(authLogout());
        // this.props.dispatch(settingsClear());
    }

    onTerms = () => openURL(TERMS_URL)

    onSupport = () => openURL(SUPPORT_URL)

    onPrivacy = () => openURL(PRIVACY_URL)

    onChangePasscode = () => this.props.navigation.push(SCREEN_CHANGE_PASSCODE)

    onChangeEmail = () => this.props.navigation.push(SCREEN_SET_EMAIL)

    onChangeCurrency = () => this.props.navigation.push(SCREEN_SET_CURRENCY)

    render() {
        const {
            touchIdSupport,
            enableTouchId,
            subscribe,
            email,
            phone,
            country,
            escrow,
            baseCurrency,
            kids,
        } = this.props;

        console.log('kids', kids);

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
                    <Items>
                        <TouchableOpacity style={styles.itemInner} onPress={this.onChangeEmail}>
                            <Text style={styles.itemName}>Email</Text>
                            <View style={styles.itemValues}>
                                <Text style={styles.itemValue}>{email || 'Not found'}</Text>
                                <Icon name="chevron" style={styles.icon} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.itemInner}>
                            <Text style={styles.itemName}>Phone</Text>
                            <Text style={styles.itemValue}>{phone ? `+${country} ${phone}` : 'Not found'}</Text>
                        </View>
                        <TouchableOpacity style={styles.itemInner} onPress={this.onChangeCurrency}>
                            <Text style={styles.itemName}>Native Currency</Text>
                            <View style={styles.itemValues}>
                                <Text style={styles.itemValue}>{baseCurrency}</Text>
                                <Icon name="chevron" style={styles.icon} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.itemInner}>
                            <Text style={styles.itemName}>{strings.accountMailingListOptIn}</Text>
                            <Switch
                                value={subscribe}
                                onValueChange={this.onSubscribe}
                                onTintColor={color.pink}
                            />
                        </View>
                    </Items>
                </View>
                <Text style={styles.sectionTitle}>
                    Security
                </Text>
                <View style={[styles.section, styles.sectionNoVPadding]}>
                    <Items>
                        {touchIdSupport && (
                            <View style={styles.itemInner}>
                                <Text style={styles.itemName}>{touchIdSupport === 'FaceID' ? 'Face' : 'Touch'} ID</Text>
                                <Switch
                                    value={enableTouchId}
                                    onValueChange={this.onSetTouchId}
                                    onTintColor={color.pink}
                                />
                            </View>
                        )}
                        <TouchableOpacity style={styles.itemInner} onPress={this.onChangePasscode}>
                            <Text style={styles.itemName}>Change Passcode</Text>

                            <Icon name="chevron" style={styles.icon} />
                        </TouchableOpacity>
                        {false && (
                            <TouchableOpacity style={styles.itemInner}>
                                <Text style={styles.itemName}>Reset 2-Factor Authentication</Text>
                            </TouchableOpacity>
                        )}
                        {kids.map((kid, index) => (
                            <TouchableOpacity key={index} style={styles.itemInner} onPress={() => {
                                Alert.alert(
                                    `Are you sure you want to reset ${kid.name}'s secret code?`,
                                    'This will require them to enter a new secret code next time they log on',
                                    [
                                        {text: 'Cancel', style: 'cancel'},
                                        {text: 'Yes', onPress: () => this.props.dispatch(authClearKidPasscode(kid.address))},
                                    ],
                                    {cancelable: false}
                                );
                            }}>
                                <Text style={styles.itemName}>Reset {kid.name}'s Secret Code</Text>
                            </TouchableOpacity>
                        ))}
                    </Items>
                </View>
                <Text style={styles.sectionTitle}>
                    Other
                </Text>
                <View style={[styles.section, styles.sectionNoVPadding]}>
                    <Items>
                        <TouchableOpacity style={styles.itemInner} onPress={this.onSupport}>
                            <Text style={styles.itemName}>Support</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.itemInner} onPress={this.onPrivacy}>
                            <Text style={styles.itemName}>Privacy Policy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemInner} onPress={this.onTerms}>
                            <Text style={styles.itemName}>Terms & Conditions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemInner}>
                            <Text style={styles.itemName}>About</Text>
                        </TouchableOpacity>
                    </Items>
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
        baseCurrency: state.settings.baseCurrency,
        kids: state.kids.kids,
    })
)(Settings);
