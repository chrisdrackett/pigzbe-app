import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Text, View, Image} from 'react-native';
import {setUseTestnet, tryAutoLoad, configInit} from '../../actions';
import styles from './styles';
import Button from '../button';
import Loader from '../loader';
import Pig from '../pig';
import {strings} from '../../constants';
import DevPanel from '../dev-panel';
import Container from '../container';
import Config from 'react-native-config';
import {SCREEN_LOGIN, SCREEN_DEVICE_AUTH} from '../../constants';

const Header = () => (
    <Container style={styles.containerHeader}>
        {/* <Image style={styles.backgroundImage} source={require('./images/header.png')} /> */}
        <Image style={styles.image} source={require('./images/pigzbe_logo.png')} />
        <Text style={styles.tagline}>{strings.loginTagline}</Text>
        <Pig/>
    </Container>
);

class Login extends Component {
    state = {
        inputText: '',
        isStarting: true,
        failed: false
    }

    async init() {
        const {dispatch} = this.props;

        this.setState({isStarting: true, failed: false});

        try {
            const {NETWORK, CONFIG_URL} = Config;
            const configURL = NETWORK ? `${CONFIG_URL}?network=${NETWORK}` : CONFIG_URL;
            const config = await (await fetch(configURL)).json();
            // console.log(JSON.stringify(config, null, 2));
            if (config.message === 'Missing Authentication Token') {
                throw new Error('Failed to load config');
            }
            dispatch(configInit(config));
            dispatch(setUseTestnet(config.network !== config.NETWORK_MAINNET));

            this.setState({isStarting: false});

            dispatch(tryAutoLoad());
            // this.props.navigation.navigate(SCREEN_DEVICE_AUTH);
        } catch (error) {
            console.log('------> ERROR');
            console.log(error);
            this.setState({
                isStarting: false,
                failed: true
            });
        }
    }

    componentDidMount() {
        this.init();
    }

    onClickLogin = () => {
        this.props.navigation.navigate(SCREEN_LOGIN);
    }

    onClickCreateAccount = () => {
        this.props.navigation.navigate(SCREEN_DEVICE_AUTH);
    }

    render() {
        const {isLoading} = this.props;
        const {isStarting, failed} = this.state;

        return (
            <Container>
                {failed ? (
                    <Fragment>
                        <Header/>
                        <Container body>
                            <View style={styles.containerText}>
                                <Text style={styles.title}>Error</Text>
                                <Text style={styles.subtitle}>Could not connect to network. Please check your internet connection and try again.</Text>
                            </View>
                            <View>
                                <Button
                                    label="Try again"
                                    onPress={() => this.init()}
                                />
                            </View>
                        </Container>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Header/>
                        <Container body>
                            <View style={styles.containerText}>
                                <Text style={styles.title}>{strings.loginTitle}</Text>
                                <Text style={styles.subtitle}>New to Pizbe? Create an account below and claim your Wollo</Text>
                            </View>
                            <View>
                                <Button label="New User" onPress={this.onClickCreateAccount} />
                                <Button label="Existing User" secondary onPress={this.onClickLogin} />
                            </View>
                        </Container>
                    </Fragment>
                )}
                <DevPanel/>
                <Loader
                    isLoading={isLoading || isStarting}
                />
            </Container>
        );
    }
}

export default connect(
    state => ({
        isLoading: state.loader.isLoading,
        error: state.auth.error,
        useTestnet: state.wollo.useTestnet
    })
)(Login);
