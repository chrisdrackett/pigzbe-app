import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, Keyboard, Image} from 'react-native';
import styles from './styles';
import Button from '../button';
import TextInput from '../text-input';
import Loader from '../loader';
import KeyboardAvoid from '../keyboard-avoid';
import Container from '../container';
import {SCREEN_CREATE_ACCOUNT} from '../../constants';
import Header from '../header';
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
            this.props.navigation.navigate(SCREEN_CREATE_ACCOUNT);
        }
    }

    render() {
        const {
            dispatch,
            isLoading,
            error,
            navigation,
            // online,
            id,
            qrCode,
            // verified,
            // failCount,
            // requested
        } = this.props;

        return (
            <Container>
                <KeyboardAvoid>
                    <Header/>
                    <Container body>
                        <View style={styles.containerText}>
                            <Text style={styles.title}>{'Verify your device'}</Text>
                            <Text style={styles.subtitle}>{'Before we begin, enter your mobile number to verify your mobile device.'}</Text>
                            {/* <Text style={styles.subtitle}>Online: {online ? 'true' : 'false'}</Text> */}
                            {error && (
                                <Text style={styles.subtitle}>{error.message}</Text>
                            )}
                            {/* <Text style={styles.subtitle}>requested: {requested ? 'true' : 'false'}</Text> */}
                            {/* <Text style={styles.subtitle}>verified: {verified ? 'true' : 'false'}</Text> */}
                            {/* <Text style={styles.subtitle}>failCount: {failCount}</Text> */}
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
                                    onChangeText={code => this.setState({code})}
                                    returnKeyType="done"
                                />
                                <Button
                                    label={'Resend code'}
                                    onPress={() => {
                                        dispatch(deviceAuthLogin());
                                    }}
                                />
                                <Button
                                    label={'Verify'}
                                    onPress={() => {
                                        if (!this.state.code) {
                                            return;
                                        }
                                        dispatch(deviceAuthVerify(this.state.code));
                                    }}
                                />
                                <Button
                                    secondary
                                    label={'Back'}
                                    onPress={() => {
                                        dispatch(deviceAuthClear());
                                    }}
                                />
                            </View>
                        )}
                        {!id && (
                            <View>
                                <TextInput
                                    error={!!error}
                                    value={this.state.email}
                                    placeholder={'Email address'}
                                    onChangeText={email => this.setState({email})}
                                    returnKeyType="done"
                                />
                                <TextInput
                                    error={!!error}
                                    value={this.state.phone}
                                    placeholder={'Phone'}
                                    onChangeText={phone => this.setState({phone})}
                                    returnKeyType="done"
                                />
                                <TextInput
                                    error={!!error}
                                    value={this.state.country}
                                    placeholder={'Country Code'}
                                    onChangeText={country => this.setState({country})}
                                    returnKeyType="done"
                                />
                                <Button
                                    label={'Send Code'}
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        dispatch(deviceAuthRegister(this.state.email, this.state.phone, this.state.country));
                                    }}
                                    disabled={!(this.state.email && this.state.phone && this.state.country)}
                                />
                                {__DEV__ && (
                                    <Button
                                        secondary
                                        label={'Skip'}
                                        onPress={() => navigation.navigate(SCREEN_CREATE_ACCOUNT)}
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
