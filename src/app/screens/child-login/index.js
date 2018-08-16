import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import {CHILD_PASSCODE_LENGTH} from '../../constants';

import {SCREEN_SAVE_KEYS, SCREEN_IMPORT_KEYS} from '../../constants';
import {createKeys} from '../../actions';

import IconPad from '../../components/icon-pad';
import StepModule from '../../components/step-module';
import Dots from '../../components/dots';

import {loginAndLoadKid} from '../../actions';


export class ChildLogin extends Component {
    state = {
        input: new Set(),
    }

    onCreate = async () => {
        await this.props.dispatch(createKeys());
        this.props.navigation.navigate(SCREEN_SAVE_KEYS);
    }

    onImport = () => this.props.navigation.navigate(SCREEN_IMPORT_KEYS)

    onCodeEntered = code => {
        console.log('onCodeEntered', code);
        const address = this.props.navigation.getParam('address');
        this.props.dispatch(loginAndLoadKid(address, code));
    }

    render() {
        const {error, loading, message} = this.props;

        return (
            <StepModule
                title="Welcome back"
                icon="keys"
                content={'Please enter your *Secret Code* by selecting your 3 images'}
                pad
                headerChildren={(
                    <View style={{marginTop: 30}}>
                        <Dots length={CHILD_PASSCODE_LENGTH} progress={this.state.input.size}/>
                    </View>
                )}
                loading={loading}
                loaderMessage={message}
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
    state => ({
        loading: state.loader.loading,
        message: state.loader.message,
        error: state.auth.error
    })
)(ChildLogin);
