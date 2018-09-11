import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Button from '../../components/button';
import {SCREEN_MNEMONIC, SCREEN_IMPORT_KEYS} from '../../constants';
import StepModule from '../../components/step-module';
import Paragraph from '../../components/paragraph';
import styles from './styles';

export class KeysCreate extends Component {
    onCreate = () => this.props.navigation.navigate(SCREEN_MNEMONIC)

    onImport = () => this.props.navigation.navigate(SCREEN_IMPORT_KEYS)

    render() {
        return (
            <StepModule
                title="Create Your Keys"
                icon="keys"
                content={'We will now create your Public and Private wallet keys. Your *Private Key must remain confidential*.'}
                pad
            >
                <View style={styles.container}>
                    <Paragraph small>
                    Pigzbe will not be able to access accounts, recover keys, reset passwords, nor reverse transactions. *You are responsible for the security of your Wallet/assets*.
                    </Paragraph>
                    <View>
                        <Button
                            label={'Create Keys'}
                            onPress={this.onCreate}
                        />
                        <Button
                            theme="outline"
                            label={'Restore with previous keys'}
                            onPress={this.onImport}
                        />
                    </View>
                </View>

            </StepModule>
        );
    }
}

export default connect()(KeysCreate);
