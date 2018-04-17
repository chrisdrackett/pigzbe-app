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
import {profileUpdate} from '../actions';
import styles from './styles';
import Button from '../button';
import {openImagePicker} from './image-picker';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props
        };

        console.log('this.state', this.state);
    }

    render() {
        const {
            dispatch,
            edit,
            error,
            isUpdating
        } = this.props;

        const {
            name,
            email,
            image,
            subscribe
        } = this.state;

        console.log('subscribe', subscribe);
        console.log('image', image);

        if (isUpdating) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {edit ? (
                    <Text style={styles.title}>Edit your account?</Text>
                ) : (
                    <Text style={styles.title}>Create your account</Text>
                )}
                <TouchableOpacity
                    onPress={() => {
                        openImagePicker()
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
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={value => this.setState({name: value})}
                />
                <TextInput
                    style={styles.input}
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
                    onPress={() => dispatch(profileUpdate({...this.state}))}
                />
                <Button
                    label="Cancel"
                    onPress={() => console.log('CANCEL')}
                />
                <TouchableOpacity
                    onPress={() => console.log('Logout')}>
                    <Text style={styles.button}>Logout</Text>
                </TouchableOpacity>
                {error && (
                    <Text style={styles.error}>{error.message}</Text>
                )}
            </View>
        );
    }
}

export default connect(
    state => ({
        name: state.profile.name,
        email: state.profile.email,
        image: state.profile.image,
        subscribe: state.profile.subscribe
    })
)(Profile);
