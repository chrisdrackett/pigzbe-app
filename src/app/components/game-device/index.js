import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Image, TouchableOpacity, View, ActivityIndicator, Platform, PermissionsAndroid} from 'react-native';
import styles from './styles';
import images from './images';
import Modal from 'react-native-modal';
import IconButton from 'app/components/icon-button';
import Button from 'app/components/button';
import Title from 'app/components/title';
import Paragraph from 'app/components/paragraph';
import Device from 'app/utils/device';
import {appAddSuccessAlert, appAddWarningAlert} from 'app/actions';
import {color} from 'app/styles';

export class GameDevice extends Component {
    state = {
        modalOpen: false,
        connected: false,
        scanning: false,
        discovered: [],
    }

    async componentDidMount() {
        // Device.on('accelerometer', this.onAccelerometer, this);
        this.addListeners();

        Device.init();

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            const check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
            if (check) {
                console.log('Permission is OK');
            } else {
                const request = await PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
                if (request) {
                    console.log('User accept');
                } else {
                    console.log('User refuse');
                }
            }
        }
    }

    addListeners = () => {
        Device.on('connect', this.onConnect);
        Device.on('disconnect', this.onDisconnect);
        Device.on('scanning', this.onScanning);
        Device.on('discover', this.onDiscover);
        Device.on('button', this.onButton);
    }

    removeListeners = () => {
        Device.removeListener('connect', this.onConnect);
        Device.removeListener('disconnect', this.onDisconnect);
        Device.removeListener('scanning', this.onScanning);
        Device.removeListener('discover', this.onDiscover);
        Device.removeListener('button', this.onButton);
    }

    componentWillUnmount() {
        // Device.destroy();
        this.removeListeners();
    }

    onScanning = value => this.setState({scanning: value})

    onDiscover = discovered => this.setState({discovered})

    onConnect = () => {
        this.setState({connected: true, discovered: []});
        this.props.dispatch(appAddSuccessAlert('Device Connected'));
    }

    onDisconnect = () => {
        this.setState({connected: false, discovered: []});
        this.props.dispatch(appAddWarningAlert('Device Disconnected'));
    }

    onScan = () => Device.scan()

    onConnectDevice = id => Device.connect(id)

    onButton = id => {
        console.log('button pressed', id);
        this.onClose();
    }

    onOpen = () => {
        // this.addListeners();
        this.setState({modalOpen: true});
    }

    onClose = () => {
        // this.removeListeners();
        this.setState({modalOpen: false});
    }

    render() {
        const source = this.state.connected ? images.connected : images.idle;

        return (
            <Fragment>
                <TouchableOpacity
                    onPress={this.onOpen}
                    style={styles.buttonWrapper}>
                    <Image style={styles.buttonImage} source={source}/>
                </TouchableOpacity>
                <Modal
                    isVisible={this.state.modalOpen}
                    style={{margin: 0}}
                    backdropOpacity={0.35}
                    backdropColor="rgb(0, 50, 120)"
                    onBackButtonPress={this.onClose}
                >
                    <View style={styles.overlay}>
                        <View style={styles.outerContainer}>
                            <View style={styles.container}>
                                <Title dark>Connect Device</Title>
                                <Paragraph style={{textAlign: 'center'}}>
                                    To connect your Pigzbe device, turn it on and press Scan
                                </Paragraph>
                                <View style={{width: '100%', height: 200, alignItems: 'center', justifyContent: 'center'}}>
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
                                            <Image source={require('../step-header/images/tick2.png')} />
                                            <Paragraph style={{textAlign: 'center'}}>*Connected*</Paragraph>
                                            <Paragraph style={{textAlign: 'center'}}>Press any button on the device to continue</Paragraph>
                                        </Fragment>
                                    )}
                                </View>
                                <Button
                                    disabled={this.state.scanning}
                                    label="Scan"
                                    onPress={this.onScan}
                                />
                            </View>
                            <IconButton
                                style={{position: 'absolute', top: 32, right: 32}}
                                icon="crossBlue"
                                size={20}
                                padding={16}
                                onPress={this.onClose}
                            />
                        </View>
                    </View>
                </Modal>
            </Fragment>
        );
    }
}

export default connect()(GameDevice);
