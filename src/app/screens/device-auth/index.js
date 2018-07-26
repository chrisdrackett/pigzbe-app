import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Dimensions, Keyboard, Image} from 'react-native';
import Dropdown from 'react-native-modal-dropdown';

import styles from './styles';
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
import {color} from '../../styles';

const qrSize = 100;

export class DeviceAuth extends Component {
    state = {
        email: '',
        phone: '',
        country: '0',
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

    onChangeCountry = value => this.setState({country: value})

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

        this.props.dispatch(deviceAuthRegister(this.state.email, this.state.phone, countryCodes[this.state.country].code));
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
            navigation,
            id,
            qrCode,
        } = this.props;

        // const id = 2833288;
        // const qrCode = 'https://s3.amazonaws.com/qr-codes-9f266de4dd32a7244bf6862baea01379/A3-0S-XbnuBmBZyw5Coe1SDSSBYncvW1guTv1znoHkU.png';

        // console.log(id);
        // console.log(qrCode);

        const countrySelected = countryCodes[Number(this.state.country)];
        const phoneNumber = `+${countryCodes[Number(this.state.country)].code} ${this.state.phone}`;

        return (
            <StepModule
                title={!id ? 'Get Started' : 'Enter Code'}
                icon={!id ? 'tick' : 'code'}
                scroll={false}
                text={!id
                    ? 'Before we begin, enter your mobile number to verify your mobile device.'
                    : `Now enter the code we sent to ${phoneNumber}`
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
                                padding={10}
                                boxSize={{width: 35, height: 45}}
                                style={{marginTop: 0, marginBottom: 10}}
                            />
                            <Button
                                plain
                                textStyle={{color: color.blue}}
                                label={'Resend code'}
                                onPress={this.onResend}
                            />
                            <Button
                                secondary
                                label={'Verify'}
                                onPress={this.onVerify}
                            />
                            <Button
                                plain
                                textStyle={{color: color.blue}}
                                label={'Back'}
                                onPress={this.onBack}
                            />
                        </Fragment>
                    )}
                    {!id && (
                        <Fragment>

                            <TextInput
                                dark
                                error={!!error}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                value={this.state.email}
                                placeholder={'Email address'}
                                onChangeText={this.onChangeEmail}
                                returnKeyType="done"
                            />
                            <TextInput
                                dark
                                extra={{textAlign: 'center'}}
                                error={!!error}
                                keyboardType="number-pad"
                                value={this.state.phone}
                                style={{width: '100%'}}
                                placeholder={'Your mobile number'}
                                onChangeText={this.onChangePhone}
                                returnKeyType="done"
                            />
                            <Dropdown
                                options={countryCodes.map(c => c.country)}
                                style={styles.picker}
                                defaultValue={countryCodes[0].country}
                                selectedValue={countrySelected.country}
                                textStyle={styles.dropdownButton}
                                dropdownTextStyle={[styles.dropdownButton, styles.dropdownItem]}
                                dropdownStyle={styles.dropdownStyle}
                                onSelect={this.onChangeCountry}
                                dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                                adjustFrame={(obj) => {
                                    const width = Dimensions.get('window').width * 0.85;
                                    return {
                                        ...obj,
                                        top: obj.top + 75,
                                        width,
                                        left: (Dimensions.get('window').width - width) / 2
                                    };
                                }}
                            />
                            {/* <TextInput
                                error={!!error}
                                value={this.state.country}
                                placeholder={'Country Code'}
                                onChangeText={this.onChangeCountry}
                                returnKeyType="done"
                            /> */}
                            <Button
                                label={'Send Code'}
                                secondary
                                onPress={this.onSend}
                                disabled={!(this.state.email && this.state.phone && this.state.country)}
                            />
                            {__DEV__ && (
                                <Button
                                    plain
                                    textStyle={{color: color.blue}}
                                    outline
                                    label={'Skip'}
                                    onPress={() => navigation.navigate(SCREEN_TOUCH_ID)}
                                />
                            )}
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
