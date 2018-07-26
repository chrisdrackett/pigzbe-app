import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
// import styles from './styles';
import Button from '../../components/button';
// import {strings} from '../../constants';
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
                title="Import Key"
                icon="secure"
                scroll={false}
                content="Lorem ipsum dolor sit amet."
                error={error}
                pad
            >
                <View>
                    <TextInput
                        dark
                        error={!!error}
                        value={this.state.inputText}
                        placeholder={'secret key'}
                        onChangeText={this.onChangeText}
                        numberOfLines={4}
                        returnKeyType="done"
                    />
                    <Button
                        secondary
                        label={'Import'}
                        onPress={this.onImport}
                    />
                    <Button
                        outline
                        label={'Back'}
                        onPress={this.onBack}
                    />
                </View>
            </StepModule>
        );
    }
}

export default connect(
    state => ({
        error: state.wollo.error,
    })
)(KeysImport);
