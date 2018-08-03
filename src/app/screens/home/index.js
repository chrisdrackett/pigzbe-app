import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Text, View, Image} from 'react-native';
import {initialize, loadContent} from '../../actions';
import styles from './styles';
import Button from '../../components/button';
import Loader from '../../components/loader';
import Pig from '../../components/pig';
import {strings} from '../../constants';
import DevPanel from '../dev-panel';
import Container from '../../components/container';
import {SCREEN_LOGIN, SCREEN_DEVICE_AUTH} from '../../constants';

export const HomeView = ({onCreate, onLogin}) => (
    <Fragment>
        <Container style={styles.containerHeader} scroll={false}>
            <Image style={styles.image} source={require('./images/pigzbe_logo.png')} />
            <Text style={styles.tagline}>{strings.loginTagline}</Text>
            <Pig/>
        </Container>
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

class Home extends Component {
    componentWillMount() {
        this.props.dispatch(initialize());
    }

    onLogin = () => this.props.navigation.navigate(SCREEN_LOGIN)

    onCreate = async () => {
        await this.props.dispatch(loadContent());
        this.props.navigation.navigate(SCREEN_DEVICE_AUTH);
    }

    render() {
        const {initializing, loading, message} = this.props;

        return (
            <Fragment>
                <HomeView
                    onCreate={this.onCreate}
                    onLogin={this.onLogin}
                />
                <DevPanel/>
                <Loader
                    loading={initializing || loading}
                    message={message}
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        initializing: state.loader.initializing,
        loading: state.loader.loading,
        message: state.loader.message,
    })
)(Home);
