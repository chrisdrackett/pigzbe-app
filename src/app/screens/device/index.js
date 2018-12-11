import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Button from 'app/components/button';
import Paragraph from 'app/components/paragraph';
import {SCREEN_SETTINGS} from 'app/constants';
import StepModule from 'app/components/step-module';
import Device, {VIBRATE} from 'app/utils/device';
import {appAddSuccessAlert} from 'app/actions';

export class DeviceScreen extends Component {
    state = {
        connected: false,
        scanning: false,
        discovered: [],
    }

    componentDidMount() {
        Device.init();
        // Device.on('accelerometer', this.onAccelerometer, this);
        Device.on('connect', this.onConnect);
        Device.on('disconnect', this.onDisconnect);
        Device.on('scanning', this.onScanning);
        Device.on('discover', this.onDiscover);
        Device.on('button', this.onButton);
    }

    componentWillUnmount() {
        Device.destroy();
    }

    onScanning = value => this.setState({scanning: value})

    onDiscover = discovered => this.setState({discovered})

    onConnect = () => {
        this.setState({connected: true});
        this.props.dispatch(appAddSuccessAlert('Connected'));
    }

    onDisconnect = () => this.setState({connected: false})

    onBack = () => this.props.navigation.navigate(SCREEN_SETTINGS)

    onScan = () => Device.scan()

    onConnectDevice = id => Device.connect(id)

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
                            onPress={() => this.onConnectDevice(device.id)}
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

export default connect()(DeviceScreen);
