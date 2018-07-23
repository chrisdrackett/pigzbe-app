import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, Keyboard, Image} from 'react-native';
import styles from './styles';
import Button from '../../components/button';
import TextInput from '../../components/text-input';
import Loader from '../../components/loader';
import KeyboardAvoid from '../../components/keyboard-avoid';
import Container from '../../components/container';
import {SCREEN_TOUCH_ID} from '../../constants';
import Header from '../../components/header';
import isEmail from '../../utils/is-email';
import {
    deviceAuthOnline,
    deviceAuthRegister,
    deviceAuthLogin,
    deviceAuthClear,
    deviceAuthVerify
} from '../../actions';

const qrSize = 150;

class DeviceAuth extends Component {
    state = {
        email: '',
        phone: '',
        country: '',
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

    onChangeCountry = country => this.setState({country})

    onChangeCode = code => this.setState({code})

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
            navigation,
            id,
            qrCode,
        } = this.props;

        return (
            <Container>
                <KeyboardAvoid>
                    <Header/>
                    <Container body>
                        <View style={styles.containerText}>
                            <Text style={styles.title}>{'Verify your device'}</Text>
                            <Text style={styles.subtitle}>{'Before we begin, enter your mobile number to verify your mobile device.'}</Text>
                            {error && (
                                <Text style={styles.subtitle}>{error.message}</Text>
                            )}
                        </View>
                        {id && (
                            <View style={styles.containerText}>
                                <Text style={styles.subtitle}>{id}</Text>
                                {qrCode && (
                                    <Image source={{uri: qrCode}} style={{width: qrSize, height: qrSize}}/>
                                )}
                                <TextInput
                                    error={!!error}
                                    value={this.state.code}
                                    placeholder={'code'}
                                    onChangeText={this.onChangeCode}
                                    returnKeyType="done"
                                />
                                <Button
                                    label={'Resend code'}
                                    onPress={this.onResend}
                                />
                                <Button
                                    label={'Verify'}
                                    onPress={this.onVerify}
                                />
                                <Button
                                    secondary
                                    label={'Back'}
                                    onPress={this.onBack}
                                />
                            </View>
                        )}
                        {!id && (
                            <View>
                                <TextInput
                                    error={!!error}
                                    value={this.state.email}
                                    placeholder={'Email address'}
                                    onChangeText={this.onChangeEmail}
                                    returnKeyType="done"
                                />
                                <TextInput
                                    error={!!error}
                                    value={this.state.phone}
                                    placeholder={'Phone'}
                                    onChangeText={this.onChangePhone}
                                    returnKeyType="done"
                                />
                                <TextInput
                                    error={!!error}
                                    value={this.state.country}
                                    placeholder={'Country Code'}
                                    onChangeText={this.onChangeCountry}
                                    returnKeyType="done"
                                />
                                <Button
                                    label={'Send Code'}
                                    onPress={this.onSend}
                                    disabled={!(this.state.email && this.state.phone && this.state.country)}
                                />
                                {__DEV__ && (
                                    <Button
                                        secondary
                                        label={'Skip'}
                                        onPress={() => navigation.navigate(SCREEN_TOUCH_ID)}
                                    />
                                )}
                            </View>
                        )}
                    </Container>
                </KeyboardAvoid>
                <Loader
                    isLoading={isLoading}
                />
            </Container>
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
