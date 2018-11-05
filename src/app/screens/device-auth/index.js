import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Keyboard, View, Text, TouchableOpacity} from 'react-native';
import Button from 'app/components/button';
import TextInput from 'app/components/text-input';
import Checkbox from 'app/components/checkbox';
import WebPage from 'app/components/web-page';
import {SCREEN_TOUCH_ID, SCREEN_SET_PASSCODE, TERMS_URL} from 'app/constants';
import {
    color
} from '../../styles';
import {
    deviceAuthOnline,
    deviceAuthRegister,
    deviceAuthLogin,
    deviceAuthClear,
    deviceAuthVerify
} from 'app/actions';
import StepModule from 'app/components/step-module';
import countryCodes from './country-codes';
import ReactModal from 'react-native-modal';
import SearchableList from 'app/components/searchable-list';
import VerifyCode from 'app/components/verify-code';

const countryData = countryCodes.reduce((ob, {country}) => {
    ob[country] = country;
    return ob;
}, {});

const findCountryCode = country => countryCodes.find(item => item.country === country).code;

export class DeviceAuth extends Component {
    state = {
        email: '',
        phone: '',
        countryCode: countryCodes[0].code,
        countryName: countryCodes[0].country,
        showCountryModal: false,
        termsAccepted: false,
    }

    static defaultProps = {
        skippable: true,
        requestLogin: true,
        onRegister: null,
        buttonLabel: 'Send Code',
        introText: 'Before we begin, enter your mobile number to verify your mobile device.',
    }

    componentDidMount() {
        this.props.dispatch(deviceAuthOnline());
    }

    componentDidUpdate(prevProps) {
        if (this.props.verified && !prevProps.verified) {
            if (typeof this.props.onNext === 'function') {
                this.props.onNext();
                return;
            }
            const screen = this.props.touchIdSupport ? SCREEN_TOUCH_ID : SCREEN_SET_PASSCODE;
            this.props.navigation.push(screen);
        }
    }

    onChangeEmail = email => this.setState({email})

    onChangePhone = phone => this.setState({phone})

    onChangeTermsAcceptance = () => {
        this.setState({termsAccepted: !this.state.termsAccepted});
    }

    openWebPage = (webPageTitle, webPageURL) => this.setState({
        webPageOpen: true,
        webPageTitle,
        webPageURL,
    })

    onWebPageClose = () => this.setState({webPageOpen: false})

    onTermsLink = () => this.openWebPage('Terms & Conditions', TERMS_URL)

    // onChangeCountry = option => this.setState({countryName: option.label, country: option.value})
    onChangeCountry = country => {
        this.setState({
            countryName: country,
            countryCode: findCountryCode(country)
        });
        setTimeout(() => {
            this.setState({
                showCountryModal: false,
            });
        }, 200);
    }

    onSend = async () => {
        Keyboard.dismiss();
        const {email, phone, countryCode} = this.state;
        const {requestLogin} = this.props;

        const success = await this.props.dispatch(deviceAuthRegister(email, phone, countryCode, requestLogin));

        if (success && typeof this.props.onRegister === 'function') {
            this.props.onRegister();
        }
    }

    onSkip = () => {
        const screen = this.props.touchIdSupport ? SCREEN_TOUCH_ID : SCREEN_SET_PASSCODE;
        this.props.navigation.navigate(screen);
    }

    onResend = () => this.props.dispatch(deviceAuthLogin())

    onVerify = code => this.props.dispatch(deviceAuthVerify(code))

    onBack = () => this.props.navigation.goBack()

    onClear = () => this.props.dispatch(deviceAuthClear())

    onOpenCountryModal = () => this.setState({showCountryModal: true})

    onCloseCountryModal = () => this.setState({showCountryModal: false})

    render() {
        const {
            loading,
            error,
            id,
            qrCode,
            requestLogin,
        } = this.props;

        const {termsAccepted} = this.state;
        const {onChangeTermsAcceptance, onTermsLink} = this;

        if (!id || !requestLogin) {
            return (
                <StepModule
                    title="Get Started"
                    icon="tick2"
                    content={this.props.introText}
                    onBack={this.onBack}
                    loading={loading}
                    justify="space-between"
                    pad
                    showLogo
                >
                    <Fragment>
                        <View>
                            <TextInput
                                error={!!error}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                value={this.state.email}
                                placeholder={'Email address'}
                                onChangeText={this.onChangeEmail}
                            />
                            <TextInput
                                error={!!error}
                                keyboardType="number-pad"
                                value={this.state.phone}
                                style={{width: '100%'}}
                                placeholder={'Your mobile number'}
                                onChangeText={this.onChangePhone}
                            />
                            <Button
                                theme="plain"
                                label={this.state.countryName}
                                onPress={this.onOpenCountryModal}
                                error={!!error}
                            />
                            <View style={{
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'center',
                            }}>
                                <Checkbox
                                    value={termsAccepted}
                                    onValueChange={onChangeTermsAcceptance}
                                >
                                    <View style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        flexDirection: 'row',
                                        marginLeft: 10
                                    }}>
                                        <Text style={{
                                            color: color.blue,
                                            fontSize: 10
                                        }}>
                                            I agree to Pigzbe&nbsp;
                                        </Text>
                                        <TouchableOpacity onPress={onTermsLink}>
                                            <Text style={{
                                                textDecorationLine: 'underline',
                                                textDecorationStyle: 'solid',
                                                textDecorationColor: color.blue,
                                                color: color.blue,
                                                fontSize: 10
                                            }}>
                                                Terms & Conditions
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </Checkbox>
                            </View>
                            <ReactModal
                                isVisible={this.state.showCountryModal}
                                animationIn="slideInRight"
                                animationOut="slideOutRight"
                                style={{
                                    margin: 0,
                                }}
                                onBackButtonPress={() => this.setState({showCountryModal: false})}
                            >
                                <StepModule
                                    onBack={this.onCloseCountryModal}
                                    customTitle="Countries"
                                    avoidKeyboard={false}
                                    scroll={false}
                                >
                                    <SearchableList
                                        selectedKey={this.state.countryName}
                                        onChangeSelection={this.onChangeCountry}
                                        items={countryData}
                                    />
                                </StepModule>
                            </ReactModal>
                        </View>
                        <View>
                            <Button
                                label={this.props.buttonLabel}
                                onPress={this.onSend}
                                disabled={!(this.state.email && this.state.phone && this.state.countryCode && this.state.termsAccepted)}
                            />
                            {this.props.skippable && (
                                <Button
                                    theme="outline"
                                    label={'Skip'}
                                    onPress={this.onSkip}
                                    disabled={!this.state.termsAccepted}
                                />
                            )}
                        </View>
                        <WebPage
                            open={this.state.webPageOpen}
                            url={this.state.webPageURL}
                            title={this.state.webPageTitle}
                            onClose={this.onWebPageClose}
                        />
                    </Fragment>
                </StepModule>
            );
        }

        return (
            <StepModule
                title="Enter Code"
                icon="code"
                content={`Now enter the code we sent to +${this.state.countryCode}${this.state.phone.replace(/^0+/, '')}`}
                onBack={this.onClear}
                loading={loading}
                justify="space-between"
                keyboardOffset={-250}
                pad
                showLogo
            >
                <VerifyCode
                    qrCode={qrCode}
                    onVerify={this.onVerify}
                    onResend={this.onResend}
                />
            </StepModule>
        );
    }
}

export default connect(
    state => ({
        online: state.deviceAuth.online,
        id: state.deviceAuth.id,
        qrCode: state.deviceAuth.qrCode,
        error: state.deviceAuth.error,
        loading: state.deviceAuth.loading,
        requested: state.deviceAuth.requested,
        verified: state.deviceAuth.verified,
        failCount: state.deviceAuth.failCount,
        touchIdSupport: state.auth.touchIdSupport,
    })
)(DeviceAuth);
