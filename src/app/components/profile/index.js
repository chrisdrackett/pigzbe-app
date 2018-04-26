import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    Switch,
    ScrollView,
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
import TextInput from '../text-input';
import Loader from '../loader';
import Avatar from '../avatar';
import {pickImage} from '../../utils/image-picker';
import isEmail from './is-email';
import {
    strings,
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
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>
                    {hasProfile ? strings.accountEdit : strings.accountCreate}
                </Text>
                <TouchableOpacity
                    style={styles.avatar}
                    onPress={() => {
                        pickImage()
                            .then(({uri}) => this.setState({image: uri}))
                            .catch(err => console.log('error', err));
                    }}>
                    <Avatar image={image}/>
                    <Text style={styles.avatarText}>
                        {hasProfile ? strings.accountChangeImage : strings.accountAddImage}
                    </Text>
                </TouchableOpacity>
                <TextInput
                    error={!validName}
                    placeholder={strings.accountNamePlaceholder}
                    value={name}
                    onChangeText={value => this.setState({name: value})}
                />
                <TextInput
                    error={!validEmail}
                    placeholder={strings.accountEmailPlaceholder}
                    value={email}
                    onChangeText={value => this.setState({email: value})}
                />
                <View style={styles.subscribe}>
                    <Text style={styles.subscribeText}>
                        {strings.accountMailingListOptIn}
                    </Text>
                    <Switch
                        value={subscribe}
                        onValueChange={value => this.setState({subscribe: value})}
                    />
                </View>
                <Button
                    label={hasProfile ? strings.accountSaveButtonLabel : strings.accountSubmitButtonLabel}
                    onPress={() => this.save()}
                />
                {hasProfile ? (
                    <Button
                        label={strings.accountCancelButtonLabel}
                        onPress={() => navigation.navigate(SCREEN_BALANCE)}
                    />
                ) : null}
                {hasProfile ? (
                    <View style={styles.subscribe}>
                        <Button
                            label={strings.accountLogoutButtonLabel}
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
                        label={strings.accountPrivacyButtonLabel}
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
            </ScrollView>
        );
    }
}

export const ProfileComponent = Profile;

export default connect(
    state => ({
        name: state.profile.name,
        email: state.profile.email,
        image: state.profile.image,
        subscribe: state.profile.subscribe,
        hasProfile: state.profile.hasProfile
    })
)(Profile);
