import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/button';
import {SCREEN_CREATE_KEYS} from '../../constants';
import TextInput from '../../components/text-input';
import {restoreKeys} from '../../actions';
import StepModule from '../../components/step-module';

export class KeysRestore extends Component {
    state = {
        inputText: ''
    }

    onImport = () => this.props.dispatch(restoreKeys(this.state.inputText))

    onBack = () => this.props.navigation.navigate(SCREEN_CREATE_KEYS)

    onChangeText = inputText => this.setState({inputText})

    render() {
        const {error, loading} = this.props;

        return (
            <StepModule
                title="Restore Wallet"
                icon="restore"
                content="Please enter your previously created Private Key (mnemonic phrase)"
                loading={loading}
                onBack={this.onBack}
                justify="space-between"
                pad
            >
                <TextInput
                    error={!!error}
                    value={this.state.inputText}
                    placeholder={'Your 12 word mnemonic'}
                    onChangeText={this.onChangeText}
                    numberOfLines={4}
                    style={{textAlign: 'center'}}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Button
                    disabled={!this.state.inputText}
                    style={{marginTop: 30}}
                    label={'Recover Wallet'}
                    onPress={this.onImport}
                />
            </StepModule>
        );
    }
}

export default connect(
    state => ({
        error: state.keys.restoreError,
        loading: state.keys.restoreLoading,
    })
)(KeysRestore);
