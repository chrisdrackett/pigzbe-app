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


export class ChildLogin extends Component {
    state = {
        input: new Set(),
    }

    onCreate = async () => {
        await this.props.dispatch(createKeys());
        this.props.navigation.navigate(SCREEN_SAVE_KEYS);
    }

    onImport = () => this.props.navigation.navigate(SCREEN_IMPORT_KEYS)

    render() {
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
            >
                <View style={styles.centered}>
                    <IconPad
                        onInput={i => this.setState({input: i})}
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

export default connect()(ChildLogin);
