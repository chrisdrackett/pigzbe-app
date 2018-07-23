import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import styles from './styles';
import Button from '../../components/button';
// import {strings} from '../../constants';
import Container from '../../components/container';
import {SCREEN_SET_PASSCODE} from '../../constants';
import Header from '../../components/header';
import {settingsEnableTouchId} from '../../actions';

class TouchId extends Component {
    onEnable = () => {
        this.props.dispatch(settingsEnableTouchId(true));
        this.onSkip();
    }

    onSkip = () => {
        this.props.navigation.navigate(SCREEN_SET_PASSCODE);
    }

    render() {
        return (
            <Container>
                <Header/>
                <Container body>
                    <View style={styles.containerText}>
                        <Text style={styles.title}>{'Use Touch ID?'}</Text>
                        <Text style={styles.subtitle}>{'We use your phone’s security in combination with it’s in-built hardware to secure your account.'}</Text>
                    </View>
                    <View>
                        <Button
                            label={'Enable Touch ID'}
                            onPress={this.onEnable}
                        />
                        <Button
                            secondary
                            label={'Just use a passcode'}
                            onPress={this.onSkip}
                        />
                    </View>
                </Container>
            </Container>
        );
    }
}

export default connect()(TouchId);
