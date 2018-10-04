import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Switch,
    Picker
} from 'react-native';
import styles from './styles';
import container from '../../styles';
import Button from '../../components/button';
import Storage from '../../utils/storage';
import Keychain from '../../utils/keychain';
import {setUseTestnet, keysTestUser, configUpdate} from '../../actions';
import {
    KEYCHAIN_ID_STELLAR_KEY,
    KEYCHAIN_ID_ETH_KEY,
    KEYCHAIN_ID_PASSCODE,
    KEYCHAIN_ID_MNEMONIC,
    STORAGE_KEY_SETTINGS,
    STORAGE_KEY_BURNING,
    STORAGE_KEY_KIDS,
    STORAGE_KEY_TASKS,
} from '../../constants';
import Icon from '../../components/icon';

const SwitchControl = ({
    label,
    value,
    onValueChange
}) => (
    <View style={styles.switch}>
        <Text style={styles.subtitle}>
            {label}
        </Text>
        <Switch
            value={value}
            onValueChange={val => onValueChange(val)}
        />
    </View>
);

// testnet issuing:
// Public key: GASIP5FKCZ7J3MUG7UHUW4Z4M5GYHLNER7TSFVMSRQ33LBWICFBG2FNX
// Secret key: SD2Y62FQUVBLGBCUTQCJ5RK5ZZ33QZRNVCNO5LRLWU2F4I6VZPRIJY62

// testnet distribution:
// Public key: GC2ZXF5Q27LU62PC73KTF55WKM3LKZEUA3SHFBYHCT6ECJQS4432DIGC
// Secret key: SBJZSBTMIKWYZ3NLK7ZM5OWGLFE33YWLWZBMKI6GXRLHVQ2VTLS2NGPH

const testUsers = [{
    label: 'None',
    publicKey: '',
    secretKey: ''
}, {
    label: 'User 1',
    publicKey: 'GBD5SFA553VO6UC4NUQVCODUJ5PYDKUKQ5PLVZRJIM22FQIQ7TQJY3FN',
    secretKey: 'SDYD2JGCGH7UWWMYPGLH6N55PMM2VT7VIFHPY2C5U442E5DOMURQE6DQ'
}, {
    label: 'User 2',
    publicKey: 'GDF7DRJXKBDYXKNP4JOBUVGEIHLVEXZKKX7V7IYNMEXM7J5H3LLFW5TU',
    secretKey: 'SCDPMD5OYVCG355WCTAMMI7JH3UUBL6U7KH27VXO7BYJC7YWBMHHSWXE'
}];

class DevPanel extends Component {
    state = {
        isOpen: false,
        isHidden: false
    }

    render() {
        const {
            dispatch,
            useTestnet,
            testUserKey,
            networkOverride
        } = this.props;

        if (!__DEV__ || this.state.isHidden) {
            return null;
        }

        if (this.state.isOpen) {
            return (
                <View style={styles.overlay}>
                    <ScrollView>
                        <View style={[container, styles.inner]}>
                            <Text style={styles.title}>Dev panel</Text>
                            <Text style={styles.subtitle}>
                                Env dev: {__DEV__ ? 'true' : 'false'}
                            </Text>
                            <Text style={styles.subtitle}>
                                networkOverride: {networkOverride ? networkOverride : 'none'}
                            </Text>
                            <SwitchControl
                                label={'Use Testnet?'}
                                value={useTestnet}
                                onValueChange={value => dispatch(setUseTestnet(value))}
                            />
                            <View style={styles.block}>
                                <Text style={styles.subtitle}>User data</Text>
                                <Button style={styles.button} label="Clear user data" onPress={() => {
                                    console.log('clear');
                                    Storage.clear(STORAGE_KEY_SETTINGS);
                                    Storage.clear(STORAGE_KEY_KIDS);
                                    Keychain.clear(KEYCHAIN_ID_STELLAR_KEY);
                                    Keychain.clear(KEYCHAIN_ID_PASSCODE);
                                    Keychain.clear(KEYCHAIN_ID_ETH_KEY);
                                    Keychain.clear(KEYCHAIN_ID_MNEMONIC);
                                }} />
                            </View>
                            <View style={styles.block}>
                                <Text style={styles.subtitle}>Family data</Text>
                                <Button style={styles.button} label="Clear family data" onPress={() => {
                                    console.log('clear');
                                    Storage.clear(STORAGE_KEY_KIDS);
                                }} />
                                <Button style={styles.button} label="Clear tasks data" onPress={() => {
                                    console.log('clear');
                                    Storage.clear(STORAGE_KEY_TASKS);
                                }} />
                            </View>
                            <View style={styles.block}>
                                <Text style={styles.subtitle}>Claim tool</Text>
                                <Button style={styles.button} label="Clear cache burning" onPress={() => {
                                    console.log('clear');
                                    Storage.clear(STORAGE_KEY_BURNING);
                                    Keychain.clear(KEYCHAIN_ID_ETH_KEY);
                                }} />
                            </View>
                            <Text style={styles.subtitle}>
                                Select test user
                            </Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={testUserKey || ''}
                                    onValueChange={value => dispatch(keysTestUser(value))}>
                                    {testUsers.map(user => (
                                        <Picker.Item
                                            key={user.label}
                                            label={user.label}
                                            value={user.secretKey}
                                        />
                                    ))}
                                </Picker>
                            </View>
                            <Text style={styles.subtitle}>
                                Network override
                            </Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={networkOverride || ''}
                                    onValueChange={value => dispatch(configUpdate({networkOverride: value}))}>
                                    {['none', 'local', 'mainnet', 'ropsten'].map((n, i) => (
                                        <Picker.Item
                                            key={i}
                                            label={n}
                                            value={n === 'none' ? null : n}
                                        />
                                    ))}
                                </Picker>
                            </View>
                            <View style={styles.block}>
                                <Button style={styles.button} label="Hide panel" onPress={() => {
                                    this.setState({isHidden: true});
                                }} />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.closeBtn}
                            onPress={() => this.setState({isOpen: false})}>
                            <Text style={styles.closeBtnText}>╳</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            );

        }
        return (
            <View style={styles.topBar}>
                <Text
                    style={networkOverride ? [styles.net, styles.netLive] : styles.net}>
                    {networkOverride ? networkOverride : 'NO NETWORK OVERRIDE'}
                </Text>
                <TouchableOpacity
                    style={styles.settings}
                    onPress={() => this.setState({isOpen: true})}>
                    <Icon style={styles.settingsIcon} name="settings" />
                </TouchableOpacity>
            </View>
        );
    }
}

// export for test
export const DevPanelComponent = DevPanel;

export default connect(
    state => ({
        testUserKey: state.keys.testUserKey,
        useTestnet: state.wollo.useTestnet,
        configURL: state.config.configURL,
        networkOverride: state.config.networkOverride,
    })
)(DevPanel);
