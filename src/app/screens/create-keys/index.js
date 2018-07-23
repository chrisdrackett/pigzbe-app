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

class CreateKeys extends Component {
    onCreate = () => {
        this.props.dispatch(createKeys());
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
                        <Text style={styles.title}>{'Create Keys'}</Text>
                        <Text style={styles.subtitle}>{'Lorem ipsum.'}</Text>
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
)(CreateKeys);
