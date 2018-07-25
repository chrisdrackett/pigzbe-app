import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {createKeys} from '../../actions';
import Button from '../../components/button';
// import {strings} from '../../constants';
import {SCREEN_SAVE_KEYS, SCREEN_IMPORT_KEYS} from '../../constants';
import StepModule from '../../components/step-module';

class KeysCreate extends Component {
    onCreate = async () => {
        await this.props.dispatch(createKeys());
        this.props.navigation.navigate(SCREEN_SAVE_KEYS);
    }

    onImport = () => {
        this.props.navigation.navigate(SCREEN_IMPORT_KEYS);
    }

    render() {
        return (
            <StepModule
                title="Create Your Keys"
                icon="keys"
                scroll={false}
                tagline={'We will now create your Public and Private wallet keys.\n\nYour Private Key must remain confidential and you will be asked to save this in a safe place in the next step.'}
            >
                <Button
                    secondary
                    label={'Create Keys'}
                    onPress={this.onCreate}
                />
                <Button
                    outline
                    textStyle={{fontSize: 14, paddingTop: 12}}
                    label={'Restore with previous keys'}
                    onPress={this.onImport}
                />

            </StepModule>
        );
    }
}

export default connect(
    state => ({
        error: state.wollo.error
    })
)(KeysCreate);
