import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {createKeys} from '../../actions';
import IconPad from '../../components/icon-pad';
import {Text} from 'react-native';
import {SCREEN_SAVE_KEYS, SCREEN_IMPORT_KEYS} from '../../constants';
import StepModule from '../../components/step-module';

export class ChildLogin extends Component {
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
            >
                <View style={styles.centered}>
                    <IconPad />
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
