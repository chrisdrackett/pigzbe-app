import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import styles from './styles';
import Button from '../../components/button';
// import {strings} from '../../constants';
import Container from '../../components/container';
import {SCREEN_CREATE_KEYS} from '../../constants';
import Header from '../../components/header';
import {saveKeys} from '../../actions';

class KeysSave extends Component {
    onSave = () => this.props.dispatch(saveKeys())

    onBack = () => this.props.navigation.navigate(SCREEN_CREATE_KEYS)

    render() {
        const {secretKey} = this.props;

        return (
            <Container>
                <Header/>
                <Container body>
                    <View style={styles.containerText}>
                        <Text style={styles.title}>{'Save Keys'}</Text>
                        <Text style={styles.subtitle}>{secretKey}</Text>
                    </View>
                    <View>
                        <Button
                            label={'Save Keys'}
                            onPress={this.onSave}
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
        secretKey: state.wollo.secretKey
    })
)(KeysSave);
