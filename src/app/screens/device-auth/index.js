import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Keyboard, View} from 'react-native';
import Button from '../../components/button';
import TextInput from '../../components/text-input';
import {SCREEN_HOME, SCREEN_TOUCH_ID, SCREEN_SET_PASSCODE} from '../../constants';
import {
    deviceAuthOnline,
    deviceAuthRegister,
    deviceAuthLogin,
    deviceAuthClear,
    deviceAuthVerify
} from '../../actions';
import StepModule from '../../components/step-module';
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
    }

    componentDidMount() {
        this.props.dispatch(deviceAuthOnline());
    }

    componentDidUpdate(prevProps) {
        if (this.props.verified && !prevProps.verified) {
            const screen = this.props.touchIdSupport ? SCREEN_TOUCH_ID : SCREEN_SET_PASSCODE;
            this.props.navigation.push(screen);
        }
    }

    onChangeEmail = email => this.setState({email})

    onChangePhone = phone => this.setState({phone})

    // onChangeCountry = option => this.setState({countryName: option.label, country: option.value})
    onChangeCountry = country => this.setState({
        countryName: country,
        countryCode: findCountryCode(country)
    })

    onSend = () => {
        Keyboard.dismiss();
        this.props.dispatch(deviceAuthRegister(this.state.email, this.state.phone, this.state.countryCode));
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
        } = this.props;

        return (
            <Fragment>
                <StepModule
                    title={!id ? 'Get Started' : 'Enter Code'}
                    icon={!id ? 'tick' : 'code'}
                    content={!id
                        ? 'Before we begin, enter your mobile number to verify your mobile device.'
                        : `Now enter the code we sent to +${this.state.countryCode}${this.state.phone.replace(/^0+/, '')}`
                    }
                    onBack={!id ? this.onBack : this.onClear}
                    loading={loading}
                    // error={error}
                    justify="space-between"
                    pad
                >
                    {id && (
                        <VerifyCode
                            qrCode={qrCode}
                            onVerify={this.onVerify}
                            onResend={this.onResend}
                            error={error}
                        />
                    )}
                    {!id && (
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
                                />
                                <ReactModal
                                    isVisible={this.state.showCountryModal}
                                    animationIn="slideInRight"
                                    animationOut="slideOutRight"
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    <StepModule
                                        onBack={this.onCloseCountryModal}
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
                                    label={'Send Code'}
                                    onPress={this.onSend}
                                    disabled={!(this.state.email && this.state.phone && this.state.countryCode)}
                                />
                                <Button
                                    theme="outline"
                                    label={'Skip'}
                                    onPress={this.onSkip}
                                />
                            </View>
                        </Fragment>
                    )}
                </StepModule>
            </Fragment>
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
