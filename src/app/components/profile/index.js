import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    TextInput,
    View,
    Switch,
    TouchableOpacity
} from 'react-native';
import {
    profileUpdate,
    profileAvailable,
    profileClear,
    authLogout
} from '../../actions';
import styles from './styles';
import Button from '../button';
import Loader from '../loader';
import Avatar from '../avatar';
import {pickImage} from '../../utils/image-picker';
import isEmail from './is-email';
import {color} from '../../styles';
import {
    SCREEN_BALANCE,
    SCREEN_PRIVACY
} from '../../constants';

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
                navigation.navigate(SCREEN_BALANCE);
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
                    <Avatar image={image}/>
                    <Text style={styles.avatarText}>{hasProfile ? 'Change profile image?' : 'Add Profile Image'}</Text>
                </TouchableOpacity>
                <TextInput
                    style={validName ? styles.input : styles.inputError}
                    placeholder="Name"
                    placeholderTextColor={color.white}
                    value={name}
                    onChangeText={value => this.setState({name: value})}
                />
                <TextInput
                    style={validEmail ? styles.input : styles.inputError}
                    placeholder="Email address"
                    placeholderTextColor={color.white}
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
                        onPress={() => navigation.navigate(SCREEN_BALANCE)}
                    />
                ) : null}
                {hasProfile ? (
                    <View style={styles.subscribe}>
                        <Button
                            label="Logout"
                            plain
                            onPress={() => dispatch(authLogout())}
                        />
                        <Button
                            label="Clear data"
                            plain
                            onPress={() => dispatch(profileClear())}
                        />
                    </View>
                ) : (
                    <Button
                        label="Privacy"
                        plain
                        onPress={() => navigation.navigate(SCREEN_PRIVACY)}
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
