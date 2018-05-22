import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    Image,
    KeyboardAvoidingView
} from 'react-native';
import {tryAutoLoad, load} from '../../actions';
import styles from './styles';
import Button from '../button';
import TextInput from '../text-input';
import Loader from '../loader';
import Pig from '../pig';
import {
    strings,
    // SCREEN_HELP
} from '../../constants';
import DevPanel from '../dev-panel';

class Login extends Component {
    state = {
        inputText: ''
    }

    componentDidMount() {
        const {dispatch, testUserKey} = this.props;

        dispatch(tryAutoLoad());

        if (window.__DEV__ && testUserKey) {
            this.setState({inputText: testUserKey});
        }
    }

    componentDidUpdate(prevProps) {
        const {testUserKey} = this.props;

        if (window.__DEV__ && prevProps.testUserKey !== testUserKey) {
            this.setState({inputText: testUserKey});
        }
    }

    render() {
        const {
            dispatch,
            // navigation,
            isLoading,
            error
        } = this.props;

        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    contentContainerStyle={styles.containerBodyKeyb}
                    behavior="position"
                    enabled>
                    <View style={styles.containerHeader}>
                        <Image style={styles.backgroundImage} source={require('./images/header.png')} />
                        <Image style={styles.image} source={require('./images/pigzbe_logo.png')} />
                        <Text style={styles.tagline}>{strings.loginTagline}</Text>
                        <Pig/>
                    </View>
                    <View style={styles.containerBody}>
                        <Text style={styles.title}>{strings.loginTitle}</Text>
                        <Text style={styles.subtitle}>{strings.loginSubtitle}</Text>
                        <TextInput
                            error={!!error}
                            value={this.state.inputText}
                            placeholder={strings.loginPlaceholder}
                            onChangeText={inputText => this.setState({inputText})}
                        />
                        <Button
                            label={strings.loginSubmitButtonLabel}
                            onPress={() => dispatch(load(this.state.inputText))}
                            disabled={!this.state.inputText}
                        />
                        {/* <Button
                        label={strings.loginHelpButtonLabel}
                        plain
                        onPress={() => navigation.navigate(SCREEN_HELP)}
                    /> */}
                    </View>
                </KeyboardAvoidingView>
                <DevPanel/>
                <Loader
                    isLoading={isLoading}
                />
            </View>
        );
    }
}

export default connect(
    state => ({
        testUserKey: state.auth.testUserKey,
        isLoading: state.loader.isLoading,
        error: state.auth.error
    })
)(Login);
