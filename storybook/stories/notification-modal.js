import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import NotificationModal from '../../src/app/components/notification-modal';
import Button from '../../src/app/components/button';

class NotificationModalTest extends React.Component {
    state = {
        open: false,
    }
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Button
                    label="Press me"
                    onPress={() => this.setState({open: true})}
                />
                <NotificationModal
                    open={this.state.open}
                    type={this.props.type || 'success'}
                    text={this.props.text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'}
                    onRequestClose={() => this.setState({open: false})}
                />
            </View>
        );
    }
}

storiesOf('NotificationModal')
    .add('default', () => (
        <NotificationModalTest type="success" />
    ))
    .add('warning', () => (
        <NotificationModalTest type="warning" />
    ))
    .add('error', () => (
        <NotificationModalTest type="error" />
    ))
    .add('with less text', () => (
        <NotificationModalTest type="success" text="A small amount of text" />
    ))
    .add('with no button', () => (
        <NotificationModalTest type="success" hideButton />
    ))
    