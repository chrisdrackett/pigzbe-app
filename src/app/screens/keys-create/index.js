import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import {createKeys} from '../../actions';
import styles from './styles';
import Button from '../../components/button';
// import {strings} from '../../constants';
import Container from '../../components/container';
import {SCREEN_SAVE_KEYS, SCREEN_IMPORT_KEYS} from '../../constants';
import Header from '../../components/header';

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
            <Container>
                <Header/>
                <Container body>
                    <View style={styles.containerText}>
                        <Text style={styles.title}>{'Create Your Keys'}</Text>
                        <Text style={styles.subtitle}>We will now create your Public and Private wallet keys.</Text>
                        <Text style={styles.subtitle}>Your Private Key must remain confidential and you will be asked to save this in a safe place in the next step.</Text>
                    </View>
                    <View>
                        <Button
                            label={'Create Keys'}
                            onPress={this.onCreate}
                        />
                        <Button
                            secondary
                            label={'Restore with previous keys'}
                            onPress={this.onImport}
                        />
                    </View>
                </Container>
            </Container>
        );
    }
}

export default connect(
    state => ({
        error: state.wollo.error
    })
)(KeysCreate);
