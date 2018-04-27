import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    Image
} from 'react-native';
import {load} from '../../actions';
import styles from './styles';
import Button from '../button';
import TextInput from '../text-input';
import Loader from '../loader';
import Alert from '../alert';
import Pig from '../pig';
import {
    strings,
    SCREEN_HELP
} from '../../constants';
import DevPanel from '../dev-panel';

class Login extends Component {
    state = {
        inputText: 'SAXYJU6Q67IXM4DSOFGVJ2L2I7C2SQJSV2MDR2E64AKML5ZXO25RMISJ'
    }

    render() {
        const {
            dispatch,
            navigation,
            isLoading,
            error
        } = this.props;

        console.log(error);

        return (
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Image style={styles.backgroundImage} source={require('./header.png')} />
                    <Image style={styles.image} source={require('../../../../assets/images/pigzbe_logo.png')} />
                    <Text style={styles.tagline}>{strings.loginTagline}</Text>
                    <Pig/>
                </View>
                <View style={styles.containerBody}>
                    <Text style={styles.title}>{strings.loginTitle}</Text>
                    <Text style={styles.subtitle}>{strings.loginSubtitle}</Text>
                    <TextInput
                        error={!!error}
                        value={this.state.inputText}
                        placeholder={strings.loginPlaceholder}
                        onChangeText={inputText => this.setState({inputText})}
                    />
                    <Button
                        label={strings.loginSubmitButtonLabel}
                        onPress={() => dispatch(load(this.state.inputText))}
                        disabled={!this.state.inputText}
                    />
                    <Button
                        label={strings.loginHelpButtonLabel}
                        plain
                        onPress={() => navigation.navigate(SCREEN_HELP)}
                    />
                </View>
                <DevPanel/>
                <Loader
                    isLoading={isLoading}
                />
                <Alert
                    error={error}
                />
            </View>
        );
    }
}

export default connect(
    state => ({
        isLoading: state.loader.isLoading,
        error: state.auth.error
    })
)(Login);
