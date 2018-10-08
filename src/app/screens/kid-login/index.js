import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import {KID_PASSCODE_LENGTH} from '../../constants';

import IconPad from '../../components/icon-pad';
import StepModule from '../../components/step-module';
import Dots from '../../components/dots';

import {loginAndLoadKid} from '../../actions';


export class KidLogin extends Component {
    state = {
        input: new Set(),
    }

    onCodeEntered = code => {
        console.log('onCodeEntered', code);
        this.props.dispatch(loginAndLoadKid(this.props.kid, code));
    }

    render() {
        const {error, loading, message} = this.props;

        return (
            <StepModule
                title="Welcome back"
                content={'Please enter your *Secret Code* by selecting your 3 images'}
                pad
                headerChildren={(
                    <Dots length={KID_PASSCODE_LENGTH} progress={this.state.input.size}/>
                )}
                loading={loading}
                loaderMessage={message}
                justify="center"
                onBack={() => this.props.navigation.goBack()}
            >
                <View style={styles.centered}>
                    <IconPad
                        error={error}
                        onInput={i => this.setState({input: i})}
                        onFull={this.onCodeEntered}
                    />
                    <Text style={styles.labelText}>
                        *Forgotten your secret code?*
                        {'\n'}
                        Ask dad to reset it from his settings
                    </Text>
                </View>
            </StepModule>
        );
    }
}

export default connect(
    (state, props) => ({
        kid: props.navigation.state.params.kid,
        loading: state.loader.loading,
        message: state.loader.message,
        error: state.auth.error
    })
)(KidLogin);
