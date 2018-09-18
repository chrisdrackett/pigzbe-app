import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/button';
import {SCREEN_CREATE_KEYS} from '../../constants';
import TextInput from '../../components/text-input';
import {importKey} from '../../actions';
import StepModule from '../../components/step-module';

export class KeysImport extends Component {
    state = {
        inputText: ''
    }

    onImport = () => this.props.dispatch(importKey(this.state.inputText))

    onBack = () => this.props.navigation.navigate(SCREEN_CREATE_KEYS)

    onChangeText = inputText => this.setState({inputText})

    render() {
        const {error} = this.props;

        return (
            <StepModule
                title="Import Keys"
                icon="secure"
                content="Enter your secret key to import an existing account."
                // error={error}
                onBack={this.onBack}
                justify="space-between"
                pad
            >
                <TextInput
                    error={!!error}
                    value={this.state.inputText}
                    placeholder={'secret key'}
                    onChangeText={this.onChangeText}
                    numberOfLines={4}
                    returnKeyType="done"
                />
                <Button
                    style={{marginTop: 30}}
                    label={'Import'}
                    onPress={this.onImport}
                />
            </StepModule>
        );
    }
}

export default connect(
    state => ({
        error: state.keys.importError,
    })
)(KeysImport);
