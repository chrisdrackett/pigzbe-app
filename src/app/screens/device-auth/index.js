import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Keyboard, Image} from 'react-native';
import Button from '../../components/button';
import TextInput from '../../components/text-input';
import Loader from '../../components/loader';
import {SCREEN_TOUCH_ID} from '../../constants';
import isEmail from '../../utils/is-email';
import InputBoxes from '../../components/input-boxes';
import {
    deviceAuthOnline,
    deviceAuthRegister,
    deviceAuthLogin,
    deviceAuthClear,
    deviceAuthVerify
} from '../../actions';
import StepModule from '../../components/step-module';
import countryCodes from './country-codes';
import ModalSelector from 'react-native-modal-selector';

const qrSize = 100;
const countryData = countryCodes.map(({country, code}, i) => ({key: i, label: country, value: code}));

export class DeviceAuth extends Component {
    state = {
        email: '',
        phone: '',
        country: countryCodes[0].code,
        countryName: countryCodes[0].country,
        code: '',
    }

    componentDidMount() {
        this.props.dispatch(deviceAuthOnline());
    }

    componentDidUpdate(prevProps) {
        if (this.props.verified && !prevProps.verified) {
            this.props.navigation.navigate(SCREEN_TOUCH_ID);
        }
    }

    onChangeEmail = email => this.setState({email})

    onChangePhone = phone => this.setState({phone})

    onChangeCountry = option => {
        console.log('option:', option);
        this.setState({countryName: option.label, country: option.value});
    }

    onChangeCode = code => {
        console.log(code);
        this.setState({code});
    }

    onSend = () => {
        Keyboard.dismiss();

        const emailValid = this.state.email && isEmail(this.state.email);

        if (!emailValid) {
            return;
        }

        this.props.dispatch(deviceAuthRegister(this.state.email, this.state.phone, this.state.country));
    }

    onResend = () => this.props.dispatch(deviceAuthLogin())

    onVerify = () => {
        if (!this.state.code) {
            return;
        }
        this.props.dispatch(deviceAuthVerify(this.state.code));
    }

    onBack = () => this.props.dispatch(deviceAuthClear())

    render() {
        const {
            isLoading,
            error,
            id,
            qrCode,
        } = this.props;

        // const id = 2833288;
        // const qrCode = 'https://s3.amazonaws.com/qr-codes-9f266de4dd32a7244bf6862baea01379/A3-0S-XbnuBmBZyw5Coe1SDSSBYncvW1guTv1znoHkU.png';

        return (
            <StepModule
                title={!id ? 'Get Started' : 'Enter Code'}
                icon={!id ? 'tick' : 'code'}
                content={!id
                    ? 'Before we begin, enter your mobile number to verify your mobile device.'
                    : `Now enter the code we sent to +${this.state.country}${this.state.phone}`
                }
                error={error}
                pad
            >
                <Fragment>
                    {id && (
                        <Fragment>
                            {qrCode && <Image source={{uri: qrCode}} style={{marginTop: -20, marginBottom: 10, alignSelf: 'center', width: qrSize, height: qrSize}}/> }
                            <InputBoxes
                                onFulfill={this.onChangeCode}
                                boxes={7}
                                boxSize={{width: 35, height: 45}}
                            />
                            <Button
                                theme="plain"
                                label={'Resend code'}
                                onPress={this.onResend}
                            />
                            <Button
                                label={'Verify'}
                                onPress={this.onVerify}
                            />
                            <Button
                                theme="plain"
                                label={'Back'}
                                onPress={this.onBack}
                            />
                        </Fragment>
                    )}
                    {!id && (
                        <Fragment>
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
                            <ModalSelector
                                data={countryData}
                                initValue="Select something yummy!"
                                supportedOrientations={['portrait', 'landscape']}
                                accessible={true}
                                scrollViewAccessibilityLabel={'Scrollable options'}
                                cancelButtonAccessibilityLabel={'Cancel Button'}
                                onChange={this.onChangeCountry}>
                                <Button
                                    theme="plain"
                                    label={this.state.countryName}
                                    onPress={this.onBack}
                                />
                            </ModalSelector>
                            <Button
                                label={'Send Code'}
                                onPress={this.onSend}
                                disabled={!(this.state.email && this.state.phone && this.state.country)}
                            />
                            {/* {__DEV__ && (
                                <Button
                                    textStyle={{color: color.blue}}
                                    theme="plain_light"
                                    label={'Skip'}
                                    onPress={() => navigation.navigate(SCREEN_TOUCH_ID)}
                                />
                            )} */}
                        </Fragment>
                    )}
                    <Loader
                        white
                        isLoading={isLoading}
                    />
                </Fragment>
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
        isLoading: state.deviceAuth.isLoading,
        requested: state.deviceAuth.requested,
        verified: state.deviceAuth.verified,
        failCount: state.deviceAuth.failCount,
    })
)(DeviceAuth);
