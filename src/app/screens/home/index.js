import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity} from 'react-native';
import {initialize, loadContent, authKeychainKid} from '../../actions';
import styles from './styles';
import Button from '../../components/button';
import Loader from '../../components/loader';
import Pig from '../../components/pig';
import {strings} from '../../constants';
import DevPanel from '../dev-panel';
import Container from '../../components/container';
import {SCREEN_LOGIN, SCREEN_DEVICE_AUTH, SCREEN_KID_LOGIN, SCREEN_KID_SET_LOGIN} from '../../constants';
import HomeLogo from '../../components/home-logo';
import KidAvatar from '../../components/kid-avatar';

class KidProfile extends Component {
    onChoose = () => this.props.onChoose(this.props.address)

    render() {
        const {name, photo} = this.props;

        return (
            <TouchableOpacity style={styles.profile} onPress={this.onChoose}>
                <KidAvatar photo={photo} size={90}/>
                <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
        );
    }
}

export const HomeView = ({showKidLogin, kids, onCreate, onLogin, onKidLogin, onOverride}) => (
    <Fragment>
        {showKidLogin ? (
            <Fragment>
                <Container style={[styles.containerHeader, styles.containerHeaderKids]} scroll={false}>
                    <HomeLogo />
                    <Pig/>
                </Container>
                <Container style={styles.containerBody} scroll={kids.length > 2}>
                    <View style={[styles.containerText, styles.containerTextKids]}>
                        <Text style={[styles.title, styles.titleLarge]}>Welcome back!</Text>
                        <Text style={[styles.subtitle, styles.bold]}>Choose your profile</Text>
                    </View>
                    <View style={styles.profileWrapper}>
                        {kids.map((kid, i) => (
                            <KidProfile
                                {...kid}
                                key={i}
                                onChoose={onKidLogin}
                            />
                        ))}
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

    onKidLogin = async(address) => {
        // TODO: dispatch to set profile to log in and navigate to kid login

        const passcode = await this.props.dispatch(authKeychainKid(address));
        // Keychain.save(address, ['blah', 'blah2'].toString());
        // const keychain = await Keychain.load(address);

        // todo get keychain value for this address
        console.log('-- onKidLogin-- ', address, passcode);
        // await this.props.dispatch(loadContent());
        // this.props.navigation.navigate(SCREEN_DEVICE_AUTH);

        if (passcode) {
            this.props.navigation.navigate(
                SCREEN_KID_LOGIN,
                {address: address}
            );
        } else {
            this.props.navigation.navigate(
                SCREEN_KID_SET_LOGIN,
                {address: address}
            );
        }
        // check if kid has already created password
        // this.props.navigation.navigate(SCREEN_KID_LOGIN);
    }

    onOverride = () => this.setState({parentOverride: true})

    render() {
        const {initializing, loading, message, kids} = this.props;

        return (
            <Fragment>
                <HomeView
                    showKidLogin={kids.length && !this.state.parentOverride}
                    kids={kids}
                    onCreate={this.onCreate}
                    onLogin={this.onLogin}
                    onKidLogin={this.onKidLogin}
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
        kids: state.family.kids,
    })
)(Home);
