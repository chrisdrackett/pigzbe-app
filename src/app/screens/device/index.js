import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, Image, ActivityIndicator} from 'react-native';
import Button from 'app/components/button';
import Paragraph from 'app/components/paragraph';
import {SCREEN_SETTINGS} from 'app/constants';
import StepModule from 'app/components/step-module';
import Device from 'app/utils/device';
import {appAddSuccessAlert} from 'app/actions';
import {color} from 'app/styles';

export class DeviceScreen extends Component {
    state = {
        connected: false,
        scanning: false,
        discovered: [],
    }

    componentDidMount() {
        // Device.on('accelerometer', this.onAccelerometer, this);
        this.addListeners();

        Device.init();
    }

    addListeners() {
        Device.on('connect', this.onConnect);
        Device.on('disconnect', this.onDisconnect);
        Device.on('scanning', this.onScanning);
        Device.on('discover', this.onDiscover);
        Device.on('button', this.onButton);
    }

    removeListeners() {
        Device.removeListener('connect', this.onConnect);
        Device.removeListener('disconnect', this.onDisconnect);
        Device.removeListener('scanning', this.onScanning);
        Device.removeListener('discover', this.onDiscover);
        Device.removeListener('button', this.onButton);
    }

    componentWillUnmount() {
        this.removeListeners();
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
        this.onBack();
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
                <View style={{width: '100%', height: 150, alignItems: 'center', justifyContent: 'center'}}>
                    {this.state.scanning && (
                        <Fragment>
                            <ActivityIndicator size="large" color={color.pink} />
                            <Paragraph style={{textAlign: 'center'}}>*Scanning*</Paragraph>
                        </Fragment>
                    )}
                    {!this.state.connected && this.state.discovered.map(device => (
                        <Button
                            key={device.id}
                            label={`Connect ${device.name}`}
                            onPress={() => this.onConnectDevice(device.id)}
                        />
                    ))}
                    {this.state.connected && (
                        <Fragment>
                            <Image source={require('../../components/step-header/images/tick2.png')} />
                            <Paragraph style={{textAlign: 'center'}}>*Connected*</Paragraph>
                        </Fragment>
                    )}
                </View>
                <Button
                    disabled={this.state.scanning}
                    label="Scan"
                    onPress={this.onScan}
                />
            </StepModule>
        );
    }
}

export default connect()(DeviceScreen);
