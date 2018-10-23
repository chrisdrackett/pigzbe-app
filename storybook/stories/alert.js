import React, {Component, Fragment} from 'react';
import {storiesOf} from '@storybook/react-native';
import Alert from '../../src/app/components/alert';
import Button from '../../src/app/components/button';

const props = {
    type: 'warning',
    message: 'Lorem ipsum dolor sit amet',
    onDismiss: () => {},
};

class Wrapper extends Component {
    state = {error: null}

    render() {
        return (
            <Fragment>
                <Alert {...{
                    ...props,
                    error: this.state.error
                }}/>
                <Button
                    label={'Trigger error'}
                    onPress={() => this.setState({
                        error: [
                            new Error('Lorem ipsum dolor sit amet'),
                            new Error('Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci')
                        ][Math.floor(Math.random() * 2)]
                    })}
                    style={{
                        marginTop: 200,
                        marginLeft: 20,
                        marginRight: 20,
                    }}
                />
                <Button
                    label={'Clear error'}
                    onPress={() => this.setState({
                        error: null
                    })}
                    style={{
                        marginLeft: 20,
                        marginRight: 20,
                    }}
                />
            </Fragment>
        );
    }
}

storiesOf('Alert')
    .add('default', () => (
        <Alert {...props}/>
    ))
    .add('long', () => (
        <Alert {...{
            ...props,
            message: 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci'
        }}/>
    ))
    .add('trigger', () => (
        <Wrapper/>
    ));
