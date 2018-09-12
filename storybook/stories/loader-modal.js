import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import LoaderModal from '../../src/app/components/loader-modal';

class LoaderModalTest extends Component {
    state = {
        loading: false
    }
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'blue',
                padding: 50
            }}>
                <Text onPress={() => {

                    this.setState({loading: true});

                    setTimeout(() => {
                        this.setState({loading: false});
                    }, 5000);

                }}>Open modal</Text>
                <LoaderModal
                    message="Fetching addresses"
                    light={false}
                    loading={this.state.loading}
                />
            </View>  
        );
    }
}

storiesOf('LoaderModal')
    .add('default', () => (
        <LoaderModalTest />
    ));
