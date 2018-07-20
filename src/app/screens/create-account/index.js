import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, Keyboard} from 'react-native';
import {authCreate} from '../../actions';
import styles from './styles';
import Button from '../../components/button';
import TextInput from '../../components/text-input';
import Loader from '../../components/loader';
import {strings} from '../../constants';
import KeyboardAvoid from '../../components/keyboard-avoid';
import Container from '../../components/container';
import {SCREEN_HOME} from '../../constants';
import Header from '../../components/header';

class CreateAccount extends Component {
    state = {
        inputText: ''
    }

    render() {
        const {dispatch, isLoading, error, navigation} = this.props;

        return (
            <Container>
                <KeyboardAvoid>
                    <Header/>
                    <Container body>
                        <View style={styles.containerText}>
                            <Text style={styles.title}>{'Create Account'}</Text>
                            <Text style={styles.subtitle}>{'Enter a passcode'}</Text>
                        </View>
                        <View>
                            <TextInput
                                error={!!error}
                                value={this.state.inputText}
                                placeholder={'Passcode'}
                                onChangeText={inputText => this.setState({inputText})}
                                returnKeyType="done"
                            />
                            <Button
                                label={strings.loginSubmitButtonLabel}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    dispatch(authCreate(this.state.inputText));
                                }}
                                disabled={!this.state.inputText}
                            />
                            <Button
                                secondary
                                label={'Back'}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    navigation.navigate(SCREEN_HOME);
                                }}
                            />
                        </View>
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
        isLoading: state.loader.isLoading,
        error: state.auth.error
    })
)(CreateAccount);
