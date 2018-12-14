import BleManager from 'react-native-ble-manager';
import Buffer from 'buffer';
import {
    NativeModules,
    NativeEventEmitter
} from 'react-native';
import EventEmitter from 'eventemitter3';

const bleEmitter = new NativeEventEmitter(NativeModules.BleManager);

const SECONDS_TO_SCAN = 3;
// const RECONNECT_SCAN_INTERVAL = 3;

const DEVICE_NAME = 'Pigzbe';
const SERVICE = '32980000-1B34-1072-82A5-13805F9B34FB';
const ACCELEROMETER = '32980001-1B34-1072-82A5-13805F9B34FB';
// const GYRO = '32980002-1B34-1072-82A5-13805F9B34FB';
const BUTTON = '32980003-1B34-1072-82A5-13805F9B34FB';
const IN = '32980004-1B34-1072-82A5-13805F9B34FB';
const OUT = '32980005-1B34-1072-82A5-13805F9B34FB';

export const VIBRATE = [0x01, 0xFF, 0x01];
export const OINK = [0x03, 0x01];

const time = (seconds, value) => new Promise(resolve => setTimeout(() => resolve(value), seconds * 1000));

class Device extends EventEmitter {
    initialized = false
    connected = false
    deviceId = null
    discovered = []

    init = async () => {
        this.connected = this.deviceId && await BleManager.isPeripheralConnected(this.deviceId);

        if (this.connected) {
            this.emit('connect');
        }

        if (this.initialized) {
            return;
        }

        const started = BleManager.start({showAlert: false});
        console.log('started', started);
        this.initialized = true;

        this.stopScanListener = bleEmitter.addListener('BleManagerStopScan', this.onStopScan);
        this.discoverListener = bleEmitter.addListener('BleManagerDiscoverPeripheral', this.onDiscover);
        this.disconnectListener = bleEmitter.addListener('BleManagerDisconnectPeripheral', this.onDisconnect);
        this.updateListener = bleEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.onUpdate);

        // const connectedPeripherals = await BleManager.getConnectedPeripherals([SERVICE]);
        const connectedPeripherals = await BleManager.getConnectedPeripherals([]);
        console.log('connectedPeripherals', connectedPeripherals);
    }

    send = async data => {
        const result = await BleManager.write(this.deviceId, SERVICE, IN, data);
        console.log('result', result);
        return result;
    }

    scan = async () => {
        this.discovered = [];
        await BleManager.scan([], SECONDS_TO_SCAN, true);
        this.emit('scanning', true);
    }

    onStopScan = async () => {
        this.emit('scanning', false);
        this.emit('discover', this.discovered);

        // if (this.discovered.length === 1) {
        //     this.connect(this.discovered.pop());
        // }

        // if (this.deviceId && !this.discovered.length) {
        //     console.log('Waiting to scan again');
        //     await time(RECONNECT_SCAN_INTERVAL);
        //     this.scan();
        // }
    }

    onDiscover = async peripheral => {
        // console.log('onDiscoverPeripheral', peripheral.name);

        if (peripheral.name === DEVICE_NAME && !this.discovered.find(d => d.id === peripheral.id)) {
            this.discovered.push(peripheral);
        }


        // if (peripheral.id === this.deviceId) {
        //     console.log('peripheral.id', peripheral.id);
        //     console.log('this.deviceId', this.deviceId);
        //     console.log('Connecting prev connected device');
        //     await BleManager.stopScan();
        //     this.emit('scanning', false);
        //     this.connect(peripheral.id);
        // }
    }

    onDisconnect = async data => {
        this.connected = false;
        console.log('Disconnected from ' + data.peripheral);
        this.emit('disconnect');

        // await time(RECONNECT_SCAN_INTERVAL);
        // this.scan();
    }

    onUpdate = data => {
        // console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
        switch (data.characteristic) {
            case ACCELEROMETER:
                const buffer = Buffer.Buffer.from(data.value);
                const x = buffer.readInt16LE(0);
                const y = buffer.readInt16LE(2);
                const z = buffer.readInt16LE(4);

                this.emit('accelerometer', {x, y, z});

                break;
            case BUTTON:
                const id = data.value.pop();
                // console.log('Button', id);
                this.emit('button', id);
                // 0, 1, 2, 3 (both)
                break;
            case OUT:
                console.log('Out', data.value);
                break;
            default:

        }
    }

    connect = async id => {
        try {
            await BleManager.connect(id);

            console.log('Connected to ' + id);
            this.connected = true;

            this.emit('connect');

            this.deviceId = id;

            await time(0.2);

            const peripheralInfo = await BleManager.retrieveServices(id);
            console.log(peripheralInfo);

            await time(0.2);

            // await BleManager.startNotification(id, SERVICE, ACCELEROMETER);

            // await time(0.2);

            await BleManager.startNotification(id, SERVICE, BUTTON);

            await time(0.2);

            await BleManager.startNotification(id, SERVICE, OUT);
        } catch (e) {
            console.log(e);
        }
    }

    disconnect = async () => {
        if (this.deviceId) {
            await BleManager.disconnect(this.deviceId);
            this.emit('disconnect');
        }
    }

    destroy = () => {
        this.discoverListener.remove();
        this.stopScanListener.remove();
        this.disconnectListener.remove();
        this.updateListener.remove();
        this.removeAllListeners();

        // BleManager.stopNotification(this.deviceId, SERVICE, ACCELEROMETER);
        BleManager.stopNotification(this.deviceId, SERVICE, BUTTON);
        BleManager.stopNotification(this.deviceId, SERVICE, OUT);
        BleManager.disconnect(this.deviceId);

        this.deviceId = null;
        this.initialized = false;
    }
}

export default new Device();
