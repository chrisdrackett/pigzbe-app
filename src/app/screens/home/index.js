import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity} from 'react-native';
import {initialize, loadContent} from '../../actions';
import styles from './styles';
import Button from '../../components/button';
import Loader from '../../components/loader';
import Pig from '../../components/pig';
import {strings} from '../../constants';
import DevPanel from '../dev-panel';
import Container from '../../components/container';
import {SCREEN_LOGIN, SCREEN_DEVICE_AUTH} from '../../constants';
import HomeLogo from '../../components/home-logo';
import KidAvatar from '../../components/kid-avatar';

export const HomeView = ({hasKids, onCreate, onLogin, onOverride, kids}) => (
    <Fragment>
        {hasKids ? (
            <Fragment>
                <Container style={[styles.containerHeader, styles.containerHeaderKids]} scroll={false}>
                    <HomeLogo />
                    <Pig/>
                </Container>
                <Container style={styles.containerBody} scroll={false}>
                    <View style={styles.containerText}>
                        <Text style={[styles.title, styles.titleLarge]}>Welcome back!</Text>
                        <Text style={styles.subtitle}>Choose your profile</Text>
                        <View style={styles.profileWrapper}>
                            {kids.map(({name, photo, address}, i) => (
                                <TouchableOpacity key={i} style={styles.profile} onPress={onLogin}>
                                    <KidAvatar photo={photo} large/>
                                    <Text style={styles.name}>{name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View>
                        <Button label="Parental login" theme="plain_light" onPress={onOverride} />
                    </View>
                </Container>
            </Fragment>
        ) : (
            <Fragment>
                <Container style={styles.containerHeader} scroll={false}>
                    <HomeLogo />
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
        )}
    </Fragment>
);

class Home extends Component {
    state = {
        parentOverride: false,
    }

    componentWillMount() {
        this.props.dispatch(initialize());
    }

    onLogin = () => this.props.navigation.navigate(SCREEN_LOGIN)

    onCreate = async () => {
        await this.props.dispatch(loadContent());
        this.props.navigation.navigate(SCREEN_DEVICE_AUTH);
    }

    onOverride = () => this.setState({parentOverride: true})

    render() {
        const {initializing, loading, message, hasKids} = this.props;

        return (
            <Fragment>
                <HomeView
                    hasKids={hasKids && !this.state.parentOverride}
                    onCreate={this.onCreate}
                    onLogin={this.onLogin}
                    onOverride={this.onOverride}
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
        hasKids: state.settings.hasKids,
    })
)(Home);
