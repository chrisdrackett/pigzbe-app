import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import styles from './styles';
import Button from '../../components/button';
// import {strings} from '../../constants';
import Container from '../../components/container';
import {SCREEN_CREATE_KEYS} from '../../constants';
import Header from '../../components/header';
import TextInput from '../../components/text-input';
import {importKey} from '../../actions';

class ImportKeys extends Component {
    state = {
        inputText: ''
    }

    onImport = () => {
        this.props.dispatch(importKey(this.state.inputText));
    }

    onBack = () => {
        this.props.navigation.navigate(SCREEN_CREATE_KEYS);
    }

    render() {
        const {secretKey, error} = this.props;

        return (
            <Container>
                <Header/>
                <Container body>
                    <View style={styles.containerText}>
                        <Text style={styles.title}>{'Import Key'}</Text>
                        <Text style={styles.subtitle}>{secretKey}</Text>
                    </View>
                    <View>
                        <TextInput
                            error={!!error}
                            value={this.state.inputText}
                            placeholder={'secret key'}
                            onChangeText={inputText => this.setState({inputText})}
                            numberOfLines={4}
                            returnKeyType="done"
                        />
                        <Button
                            label={'Import'}
                            onPress={this.onImport}
                        />
                        <Button
                            secondary
                            label={'Back'}
                            onPress={this.onBack}
                        />
                    </View>
                </Container>
            </Container>
        );
    }
}

export default connect(
    state => ({
        secretKey: state.wollo.secretKey,
        error: state.wollo.error
    })
)(ImportKeys);
