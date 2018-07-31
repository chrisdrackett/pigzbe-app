import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Keyboard, Image, Dimensions, View} from 'react-native';
import Button from '../../components/button';
import TextInput from '../../components/text-input';
import {SCREEN_HOME, SCREEN_TOUCH_ID, SCREEN_SET_PASSCODE} from '../../constants';
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
import Modal from '../../components/modal';
import Title from '../../components/title';
import Paragraph from '../../components/paragraph';

const boxes = 7;
const space = 8;
const qrSize = 200;
const countryData = countryCodes.map(({country, code}, i) => ({key: i, label: country, value: code}));

export class DeviceAuth extends Component {
    state = {
        email: '',
        phone: '',
        country: countryCodes[0].code,
        countryName: countryCodes[0].country,
        code: '',
        showModal: false,
    }

    componentDidMount() {
        this.props.dispatch(deviceAuthOnline());
    }

    componentDidUpdate(prevProps) {
        if (this.props.verified && !prevProps.verified) {
            const screen = this.props.touchIdSupport ? SCREEN_TOUCH_ID : SCREEN_SET_PASSCODE;
            this.props.navigation.navigate(screen);
        }
    }

    onChangeEmail = email => this.setState({email})

    onChangePhone = phone => this.setState({phone})

    onChangeCountry = option => this.setState({countryName: option.label, country: option.value})

    onChangeCode = code => this.setState({code}, this.onVerify)

    onSend = () => {
        Keyboard.dismiss();
        this.props.dispatch(deviceAuthRegister(this.state.email, this.state.phone, this.state.country));
    }

    onResend = () => this.props.dispatch(deviceAuthLogin())

    onVerify = () => {
        if (!this.state.code || this.state.code.length < boxes) {
            return;
        }
        this.props.dispatch(deviceAuthVerify(this.state.code));
    }

    onBack = () => this.props.navigation.navigate(SCREEN_HOME)

    onClear = () => this.props.dispatch(deviceAuthClear())

    onOpenModal = () => this.setState({showModal: true})

    onCloseModal = () => this.setState({showModal: false})

    render() {
        const {
            loading,
            error,
            id,
            qrCode,
        } = this.props;

        const boxW = (Dimensions.get('window').width * 0.8875 - 40 - space * (boxes - 1)) / boxes;

        return (
            <Fragment>
                <StepModule
                    title={!id ? 'Get Started' : 'Enter Code'}
                    icon={!id ? 'tick' : 'code'}
                    content={!id
                        ? 'Before we begin, enter your mobile number to verify your mobile device.'
                        : `Now enter the code we sent to +${this.state.country}${this.state.phone.replace(/^0+/, '')}`
                    }
                    onBack={!id ? this.onBack : this.onClear}
                    loading={loading}
                    // error={error}
                    pad
                >
                    {id && (
                        <Fragment>
                            <InputBoxes
                                onFulfill={this.onChangeCode}
                                boxes={boxes}
                                boxSize={{width: boxW, height: 44}}
                                space={space}
                                error={error}
                            />
                            <View style={{marginBottom: 40}}>
                                <Button
                                    theme="plain"
                                    label={'Resend code'}
                                    onPress={this.onResend}
                                />
                                {qrCode && (
                                    <Button
                                        theme="plain"
                                        label={'Show QR Code'}
                                        onPress={this.onOpenModal}
                                    />
                                ) }
                            </View>
                            <Button
                                label={'Verify'}
                                onPress={this.onVerify}
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
                                initValue={this.state.countryName}
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
                            {__DEV__ && (
                                <Button
                                    theme="plain"
                                    label={'Skip'}
                                    onPress={() => {
                                        const screen = this.props.touchIdSupport ? SCREEN_TOUCH_ID : SCREEN_SET_PASSCODE;
                                        this.props.navigation.navigate(screen);
                                    }}
                                />
                            )}
                        </Fragment>
                    )}
                </StepModule>
                {(id && qrCode && this.state.showModal) && (
                    <Modal>
                        <Title dark>QR Code</Title>
                        <Paragraph>Scan the QR Code below with a compatible app such as Authenticator or Authy.</Paragraph>
                        <Image source={{uri: qrCode}} style={{marginBottom: 20, alignSelf: 'center', width: qrSize, height: qrSize}}/>
                        <Button
                            theme="outline"
                            label={'Close'}
                            onPress={this.onCloseModal}
                        />
                    </Modal>
                )}
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
