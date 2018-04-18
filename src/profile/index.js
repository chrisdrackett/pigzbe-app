import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    ActivityIndicator,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Switch,
    Image
} from 'react-native';
import {profileUpdate, profileAvailable, profileClear} from '../actions';
import styles from './styles';
import Button from '../button';
import {pickImage} from './image-picker';
import isEmail from './is-email';

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
                navigation.navigate('Balance');
            }
        });
    }

    cancel() {
        this.props.navigation.navigate('Balance');
    }

    clear() {
        this.props.dispatch(profileClear());
    }

    logout() {}

    render() {
        const {
            hasProfile,
            error
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
                {hasProfile ? (
                    <Text style={styles.title}>Edit your account?</Text>
                ) : (
                    <Text style={styles.title}>Create your account</Text>
                )}
                <TouchableOpacity
                    onPress={() => {
                        pickImage()
                            .then(({uri}) => this.setState({image: uri}));
                    }}>
                    <Text style={styles.button}>Add profile image</Text>
                </TouchableOpacity>
                {image ? (
                    <Image
                        source={{uri: image}}
                        style={{width: 100, height: 100}}
                    />
                ) : null}
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
                        onPress={() => this.cancel()}
                    />
                ) : null}
                {hasProfile ? (
                    <Button
                        label="Clear"
                        onPress={() => this.clear()}
                    />
                ) : null}
                {hasProfile ? (
                    <TouchableOpacity
                        onPress={() => this.logout()}>
                        <Text style={styles.button}>Logout</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => this.logout()}>
                        <Text style={styles.button}>Privacy Policy</Text>
                    </TouchableOpacity>
                )}
                {error && (
                    <Text style={styles.error}>{error.message}</Text>
                )}
                {isUpdating ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : null}
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
