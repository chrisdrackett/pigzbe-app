import React, {Component} from 'react';
import {View} from 'react-native';
import Button from 'app/components/button';
import Paragraph from 'app/components/paragraph';
import {SCREEN_SETTINGS} from 'app/constants';
import StepModule from 'app/components/step-module';
import Device, {VIBRATE} from 'app/utils/device';

export default class DeviceScreen extends Component {
    state = {
        connected: false,
        scanning: false,
        discovered: [],
    }

    onBack = () => this.props.navigation.navigate(SCREEN_SETTINGS)

    onScan = () => Device.scan()

    onConnect = id => Device.connect(id)

    // onPress={this.state.connected ? () => Controller.disconnect() : () => Controller.scan()}

    componentDidMount() {
        Device.init();
        // Device.on('accelerometer', this.onAccelerometer, this);
        Device.on('connect', () => this.setState({connected: true}));
        Device.on('disconnect', () => this.setState({connected: false}));
        Device.on('scanning', value => this.setState({scanning: value}));
        Device.on('discovered', discovered => this.setState({discovered}));
        Device.on('button', this.onButton);
    }

    componentWillUnmount() {
        Device.destroy();
    }

    onButton = id => {
        console.log('button pressed', id);
    }

    render() {
        return (
            <StepModule
                title="Device"
                content="To connect your Pigzbe device, turn it on and press Scan"
                icon="keys"
                onBack={this.onBack}
                justify="space-between"
                pad
            >
                <View>
                    <Paragraph>SCANNING: {this.state.scanning ? 'YES' : 'NO'}</Paragraph>
                    <Paragraph>CONNECTED: {this.state.connected ? 'YES' : 'NO'}</Paragraph>
                    <Paragraph>DISCOVERED:</Paragraph>
                    {this.state.discovered.map(device => (
                        <Button
                            key={device.id}
                            label={`Connect ${device.name}`}
                            onPress={() => this.onConnect(device.id)}
                        />
                    ))}
                </View>
                <Button
                    theme="outline"
                    label="Scan"
                    onPress={this.onScan}
                />
            </StepModule>
        );
    }
}
