import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity, BackHandler} from 'react-native';
import {loadContent, authKeychainKid, tryTouchIdLogin, checkAccountExists} from '../../actions';
import styles from './styles';
import Button from '../../components/button';
import Header from '../../components/header';
import Pig from '../../components/pig';
import {strings} from '../../constants';
import DevPanel from '../dev-panel';
import Container from '../../components/container';
import {SCREEN_LOGIN, SCREEN_DEVICE_AUTH, SCREEN_KID_LOGIN, SCREEN_KID_SET_LOGIN} from '../../constants';
import HomeLogo from '../../components/home-logo';
import KidAvatar from '../../components/kid-avatar';
import withLoadExchange from 'app/hocs/with-load-exchange';
import withInitialize from 'app/hocs/with-initialize';

class KidProfile extends Component {
    onChoose = () => this.props.onChoose(this.props.kid)

    render() {
        const {name, photo} = this.props.kid;

        return (
            <TouchableOpacity style={styles.profile} onPress={this.onChoose}>
                <KidAvatar photo={photo} size={90}/>
                <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
        );
    }
}

export const HomeView = ({showKidLogin, kids, onCreate, onLogin, onKidLogin, onOverride, accountExists}) => (
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
                                key={i}
                                kid={kid}
                                onChoose={onKidLogin}
                            />
                        ))}
                    </View>
                    <View style={styles.buttons}>
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
                        <Text style={styles.subtitle}>{accountExists ? 'Log into you account below.' : 'New to Pigzbe? Create an account below.'}</Text>
                    </View>
                    <View style={styles.buttons}>
                        {!accountExists && <Button label="Let's get started" theme="light" onPress={onCreate} />}
                        {accountExists && <Button label="Enter passcode and login" theme="light" onPress={onLogin} />}
                    </View>
                </Container>
            </Fragment>
        )}
    </Fragment>
);

class Home extends Component {
    state = {
        parentOverride: false,
        accountExists: null,
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        const accountExists = await this.props.dispatch(checkAccountExists());
        this.setState({
            accountExists,
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.setState({parentOverride: false});
        return true;
    }

    onLogin = () => this.props.navigation.push(SCREEN_LOGIN)

    onCreate = async () => {
        await this.props.dispatch(loadContent());
        this.props.navigation.push(SCREEN_DEVICE_AUTH);
    }

    onKidLogin = async kid => {
        const passcode = await this.props.dispatch(authKeychainKid(kid.address));
        const nextScreenId = passcode ? SCREEN_KID_LOGIN : SCREEN_KID_SET_LOGIN;
        this.props.navigation.navigate(nextScreenId, {kid});
    }

    onOverride = () => {
        this.props.dispatch(tryTouchIdLogin());
        this.setState({parentOverride: true});
    }

    render() {
        const {kids} = this.props;

        return (
            <Fragment>
                <HomeView
                    showKidLogin={kids.length && !this.state.parentOverride}
                    kids={kids}
                    onCreate={this.onCreate}
                    onLogin={this.onLogin}
                    onKidLogin={this.onKidLogin}
                    onOverride={this.onOverride}
                    accountExists={this.state.accountExists}
                />
                {kids.length > 0 && this.state.parentOverride &&
                    <View style={styles.header}>
                        <Header
                            onBack={() => this.setState({parentOverride: false})}
                            hideLogo={true}
                        />
                    </View>
                }
                <DevPanel/>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        initializing: state.loader.initializing,
        loading: state.loader.loading,
        message: state.loader.message,
        kids: state.kids.kids,
    })
)(withInitialize(withLoadExchange(Home)));
