import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    Image,
    KeyboardAvoidingView,
    Dimensions
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
import isDesktop from '../../utils/is-desktop';

const getWidth = () => Dimensions.get('window').width;

const KeybView = ({children}) => {
    if (isDesktop) {
        return children;
    }
    return (
        <KeyboardAvoidingView
            contentContainerStyle={styles.containerBodyKeyb}
            behavior="position"
            enabled>
            {children}
        </KeyboardAvoidingView>
    );
};

class Login extends Component {
    state = {
        inputText: '',
        deviceWidth: getWidth()
    }

    componentDidMount() {
        const {dispatch, testUserKey} = this.props;

        dispatch(tryAutoLoad());

        if (__DEV__ && testUserKey) {
            this.setState({inputText: testUserKey});
        }
    }

    componentDidUpdate(prevProps) {
        const {testUserKey} = this.props;

        if (__DEV__ && prevProps.testUserKey !== testUserKey) {
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
            <View style={styles.container} onLayout={() => this.setState({
                deviceWidth: getWidth()
            })}>
                <KeybView>
                    <View style={[styles.containerHeader, {
                        width: this.state.deviceWidth
                    }]}>
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
                </KeybView>
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
