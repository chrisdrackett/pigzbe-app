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
                        <Button label="Let's get started" theme="light" onPress={this.onCreate} />
                        <Button label="I already have an account" theme="plain_light" onPress={this.onLogin} />
                    </View>
                </Container>
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
