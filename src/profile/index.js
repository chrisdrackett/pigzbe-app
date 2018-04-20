import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    TextInput,
    View,
    Switch,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    profileUpdate,
    profileAvailable,
    profileClear,
    authLogout
} from '../actions';
import styles from './styles';
import Button from '../button';
import Loader from '../loader';
import {pickImage} from './image-picker';
import isEmail from './is-email';
// import {NavigationActions} from 'react-navigation';
import avatarImg from './icon-76.png';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            email: props.email,
            image: props.image,
            subscribe: props.subscribe,
            validName: true,
            validEmail: true,
            isUpdating: false
        };
    }

    // componentDidMount() {
    //     const {dispatch, navigation} = this.props;
    //
    //     if (navigation) {
    //         this.navListener = navigation.addListener('didBlur', () => {
    //             console.log('=====> BLURRRR', navigation);
    //             // navigation.navigate('Balance');
    //             const resetAction = NavigationActions.reset({
    //                 index: 0,
    //                 key: null,
    //                 actions: [NavigationActions.navigate({routeName: 'Balance'})]
    //             });
    //             navigation.dispatch(resetAction);
    //
    //         });
    //     }
    // }
    //
    // componentWillUnmount() {
    //     console.log('componentWillUnmount');
    //     if (this.navListener) {
    //         this.navListener.remove();
    //     }
    // }

    validate() {
        const {
            name,
            email
        } = this.state;

        const validName = !!name.trim();
        const validEmail = isEmail(email);

        this.setState({
            validName,
            validEmail
        });

        return validName && validEmail;
    }

    async save() {
        const isValid = this.validate();

        if (!isValid) {
            return;
        }

        const {dispatch, navigation} = this.props;

        const {
            name,
            email,
            image,
            subscribe
        } = this.state;

        this.setState({isUpdating: true});

        await dispatch(profileUpdate({name, email, image, subscribe}));

        this.setState({isUpdating: false}, () => {
            dispatch(profileAvailable(true));
            if (navigation) {
                navigation.navigate('Balance');
            }
        });
    }

    render() {
        const {
            dispatch,
            hasProfile,
            error,
            navigation
        } = this.props;

        const {
            name,
            email,
            image,
            subscribe,
            validName,
            validEmail,
            isUpdating
        } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {hasProfile ? 'Edit your account?' : 'Create your account'}
                </Text>
                <TouchableOpacity
                    style={styles.avatar}
                    onPress={() => {
                        pickImage()
                            .then(({uri}) => this.setState({image: uri}))
                            .catch(err => console.log('error', err));
                    }}>
                    <Image
                        source={image ? {uri: image} : avatarImg}
                        style={styles.avatarImage}
                    />
                    <Text style={styles.avatarText}>{hasProfile ? 'Change profile image?' : 'Add Profile Image'}</Text>
                </TouchableOpacity>
                <TextInput
                    style={validName ? styles.input : styles.inputError}
                    placeholder="Name"
                    value={name}
                    onChangeText={value => this.setState({name: value})}
                />
                <TextInput
                    style={validEmail ? styles.input : styles.inputError}
                    placeholder="Email address"
                    value={email}
                    onChangeText={value => this.setState({email: value})}
                />
                <View style={styles.subscribe}>
                    <Text style={styles.subscribeText}>Get Pigzbe Updates</Text>
                    <Switch
                        value={subscribe}
                        onValueChange={value => this.setState({subscribe: value})}
                    />
                </View>
                <Button
                    label="Save"
                    onPress={() => this.save()}
                />
                {hasProfile ? (
                    <Button
                        label="Cancel"
                        onPress={() => navigation.navigate('Balance')}
                    />
                ) : null}
                {hasProfile ? (
                    <Button
                        label="Clear data"
                        plain
                        onPress={() => dispatch(profileClear())}
                    />
                ) : null}
                {hasProfile ? (
                    <Button
                        label="Logout"
                        plain
                        onPress={() => dispatch(authLogout())}
                    />
                ) : (
                    <Button
                        label="Privacy"
                        plain
                        onPress={() => navigation.navigate('Privacy')}
                    />
                )}
                {error && (
                    <Text style={styles.error}>{error.message}</Text>
                )}
                <Loader
                    isLoading={isUpdating}
                />
            </View>
        );
    }
}

export default connect(
    state => ({
        name: state.profile.name,
        email: state.profile.email,
        image: state.profile.image,
        subscribe: state.profile.subscribe,
        hasProfile: state.profile.hasProfile
    })
)(Profile);
