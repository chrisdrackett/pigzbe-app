import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, Keyboard} from 'react-native';
import {load} from '../../actions';
import styles from './styles';
import Button from '../../components/button';
import Loader from '../../components/loader';
import {strings} from '../../constants';
import KeyboardAvoid from '../../components/keyboard-avoid';
import Container from '../../components/container';
import {SCREEN_HOME} from '../../constants';
import Header from '../../components/header';
import InputBoxes from '../../components/input-boxes';

class Login extends Component {
    state = {
        inputText: ''
    }

    onCodeEntered = code => {
        console.log(code);
        this.props.dispatch(load(code));
    }

    render() {
        const {dispatch, isLoading, error, navigation} = this.props;

        return (
            <Container>
                <KeyboardAvoid>
                    <Header/>
                    <Container body>
                        <View style={styles.containerText}>
                            <Text style={styles.title}>{strings.loginTitle}</Text>
                            {/* <Text style={styles.subtitle}>{strings.loginSubtitle}</Text> */}
                        </View>
                        <View>
                            <InputBoxes
                                boxes={6}
                                onFulfill={this.onCodeEntered}
                            />
                            {/* <TextInput
                                error={!!error}
                                value={this.state.inputText}
                                placeholder={strings.loginPlaceholder}
                                onChangeText={inputText => this.setState({inputText})}
                                returnKeyType="done"
                            /> */}
                            <Button
                                label={strings.loginSubmitButtonLabel}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    dispatch(load(this.state.inputText));
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
)(Login);
