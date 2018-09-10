import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {createKeys} from '../../actions';
import Button from '../../components/button';
// import {strings} from '../../constants';
import {SCREEN_SAVE_KEYS, SCREEN_IMPORT_KEYS} from '../../constants';
import StepModule from '../../components/step-module';
import TextInput from '../../components/text-input';
import styles from './styles';

export class KeysMnemonic extends Component {
    onCreate = async () => {
        await this.props.dispatch(createKeys());
        this.props.navigation.navigate(SCREEN_SAVE_KEYS);
    }

    onImport = () => this.props.navigation.navigate(SCREEN_IMPORT_KEYS)

    render() {
        const words = ['test', 'child', 'brisk'];
        return (
            <StepModule
                title="Your Private Key"
                icon="secure"
                content="Below is your 12 word Pigzbe wallet, Private Key. *Please write this down* and keep it in a safe place."
                pad
            >
                <View style={{flexGrow: 1, justifyContent: 'space-between'}}>
                    <TextInput
                        numberOfLines={3}
                        error={false}
                        value={'Lorem ipsum dolor'}
                        placeholder={''}
                        onChangeText={() => {}}
                    />
                    <View style={styles.wordHolder}>
                        {words.map(word => (
                            <View style={[styles.word]}>
                                <Text style={styles.wordText}>{word}</Text>
                            </View>
                        ))}
                    </View>
                    <Button
                        label={'I have written down my key'}
                        onPress={this.onCreate}
                    />
                </View>
            </StepModule>
        );
    }
}

export default connect()(KeysMnemonic);
