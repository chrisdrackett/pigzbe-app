import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import {CHILD_PASSCODE_LENGTH} from '../../constants';

import {SCREEN_SAVE_KEYS, SCREEN_IMPORT_KEYS} from '../../constants';
import {createKeys, authCreateKid} from '../../actions';

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
        const address = this.props.navigation.getParam('address');
        console.log('onCodeEntered', address, code);

        this.props.dispatch(authCreateKid(address, code));
    }

    render() {
        return (
            <StepModule
                title="First time here"
                icon="keys"
                content={'Set your *Secret Code* by picking 3 images'}
                pad
                headerChildren={(
                    <View style={{marginTop: 30}}>
                        <Dots length={CHILD_PASSCODE_LENGTH} progress={this.state.input.size}/>
                    </View>
                )}
            >
                <View style={styles.centered}>
                    <IconPad
                        onInput={i => this.setState({input: i})}
                        onFull={this.onCodeEntered}
                    />
                </View>
            </StepModule>
        );
    }
}

export default connect()(ChildLogin);
