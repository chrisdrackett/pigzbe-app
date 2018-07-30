import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Text, View, Image} from 'react-native';
import {setUseTestnet, tryAutoLoad, configInit} from '../../actions';
import styles from './styles';
import Button from '../../components/button';
import Loader from '../../components/loader';
import Pig from '../../components/pig';
import {strings} from '../../constants';
import DevPanel from '../dev-panel';
import Container from '../../components/container';
import Config from 'react-native-config';
import {SCREEN_LOGIN, SCREEN_DEVICE_AUTH} from '../../constants';

const Header = () => (
    <Container style={styles.containerHeader} scroll={false}>
        <Image style={styles.image} source={require('./images/pigzbe_logo.png')} />
        <Text style={styles.tagline}>{strings.loginTagline}</Text>
        <Pig/>
    </Container>
);

export const HomeView = ({onCreate, onLogin}) => (
    <Fragment>
        <Header/>
        <Container style={styles.containerBody} scroll={false}>
            <View style={styles.containerText}>
                <Text style={styles.title}>Welcome to Pigzbe</Text>
                <Text style={styles.subtitle}>New to Pizbe? Create an account below.</Text>
            </View>
            <View>
                <Button label="Let's get started" theme="light" onPress={onCreate} />
                <Button label="I already have an account" theme="plain_light" onPress={onLogin} />
            </View>
        </Container>
    </Fragment>
);

export const HomeErrorView = ({onInit}) => (
    <Fragment>
        <Header/>
        <Container style={styles.containerBody} scroll={false}>
            <View style={styles.containerText}>
                <Text style={styles.title}>Error</Text>
                <Text style={styles.subtitle}>Could not connect to network. Please check your internet connection and try again.</Text>
            </View>
            <View>
                <Button
                    theme="light"
                    label="Try again"
                    onPress={onInit}
                />
            </View>
        </Container>
    </Fragment>
);

class Home extends Component {
    state = {
        isStarting: true,
        failed: false
    }

    init = async () => {
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

    onLogin = () => this.props.navigation.navigate(SCREEN_LOGIN)

    onCreate = () => this.props.navigation.navigate(SCREEN_DEVICE_AUTH)

    render() {
        const {isLoading} = this.props;
        const {isStarting, failed} = this.state;

        return (
            <Container>
                {failed ? (
                    <HomeErrorView
                        onInit={this.init}
                    />
                ) : (
                    <HomeView
                        onCreate={this.onCreate}
                        onLogin={this.onLogin}
                    />
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
    })
)(Home);
