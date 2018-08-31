import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Image,
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
import {setUseTestnet, wolloTestUser, configUpdate} from '../../actions';
import {
    KEYCHAIN_ID_STELLAR_KEY,
    KEYCHAIN_ID_ETH_KEY,
    KEYCHAIN_ID_PASSCODE,
    STORAGE_KEY_SETTINGS,
    STORAGE_KEY_BURNING,
    STORAGE_KEY_FAMILY,
    STORAGE_KEY_TASKS,
} from '../../constants';

const SwitchControl = ({
    label,
    value,
    onValueChange
}) => (
    <View style={styles.switch}>
        <Text style={styles.switchText}>
            {label}
        </Text>
        <Switch
            value={value}
            onValueChange={val => onValueChange(val)}
        />
    </View>
);

const testUsers = [{
    label: 'None',
    publicKey: '',
    secretKey: ''
}, {
    label: 'User with Wollo',
    publicKey: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
    secretKey: 'SBBZSQRKV4NDIKRVSXYL3T7NYKR3QP4X23VYGLEWYITFCKFN6Y4GY2PA'
}, {
    label: 'User with escrow',
    publicKey: 'GAER3I4YDEPXCFMUB5J5OXD7QT7F4XPT2NVUOMNIUAMD2UCYOKKPFB2U',
    secretKey: 'SDHBBSJHINKGAZ2L2OSXQWWZ335LY3AQWDJTNN2PFGSJWVAXA4YXVTP4'
}, {
    label: 'User with zero Wollo',
    publicKey: 'GBCJNZC7FDVATWZ2TZDDPCKFCSTYMDHXYQACOC7PIWZKHKVAGOQVBEV7',
    secretKey: 'SCFSU3FREQAIZVAQDWDHPKPHJLJAH3S7Q2NR47SZJSPOHYTDVW5ARZ54'
}, {
    label: 'User with escrow 2',
    publicKey: 'GDHCHMOBVB2GCXOJWMEFF5BYHJZ5PUPFOLISC2D5YJPVYDJOLCSCHNCD',
    secretKey: 'SC2A6EMQMDE4PJWDFYOPRAB2UJU7M3VTDGZXCHOGTGDOTRA5HVW33QDG'
}, {
    label: 'User with escrow 3',
    publicKey: 'GAG6MT2Q4II2JHZI67QP2FHBTV7WAQ3NWVKVASDQHR7DPSP7H3HBVEQA',
    secretKey: 'SCBLV2OXPIMUHKYJRS3TMPGPBRWEVKWTJB33TW6RZEJ276VWX5GPCPXQ'
}, {
    label: 'User without Wollo trust',
    publicKey: 'GD5Q7KRFQC3Q7YQPYAZ4G65B65EBCJOVSHPE65MIYQMCLUQULQDKBLUX',
    secretKey: 'SDK7SL625ZUELSLRMD3AEK5HVMNI3FLCW7NLQLT45A6GWTYDP6AVD4CE'
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
                            <Text style={styles.switchText}>
                                Env dev: {__DEV__ ? 'true' : 'false'}
                            </Text>
                            <Text style={styles.switchText}>
                                networkOverride: {networkOverride ? networkOverride : 'none'}
                            </Text>
                            <SwitchControl
                                label={'Use Testnet?'}
                                value={useTestnet}
                                onValueChange={value => dispatch(setUseTestnet(value))}
                            />
                            <View style={styles.claimBlock}>
                                <Text style={styles.switchText}>Claim tool</Text>
                                <Button style={styles.claimClearButton} label="Clear cache burning" onPress={() => {
                                    console.log('clear');
                                    Storage.clear(STORAGE_KEY_BURNING);
                                    Keychain.clear(KEYCHAIN_ID_STELLAR_KEY);
                                    Keychain.clear(KEYCHAIN_ID_ETH_KEY);
                                }} />
                            </View>
                            <Text style={styles.switchText}>
                                Select test user
                            </Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={testUserKey || ''}
                                    onValueChange={value => dispatch(wolloTestUser(value))}>
                                    {testUsers.map(user => (
                                        <Picker.Item
                                            key={user.label}
                                            label={user.label}
                                            value={user.secretKey}
                                        />
                                    ))}
                                </Picker>
                            </View>
                            <Text style={styles.switchText}>
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
                            <View style={styles.claimBlock}>
                                <Text style={styles.switchText}>User data</Text>
                                <Button style={styles.claimClearButton} label="Clear user data" onPress={() => {
                                    console.log('clear');
                                    Storage.clear(STORAGE_KEY_SETTINGS);
                                    Storage.clear(STORAGE_KEY_FAMILY);
                                    Keychain.clear(KEYCHAIN_ID_STELLAR_KEY);
                                    Keychain.clear(KEYCHAIN_ID_PASSCODE);
                                    Keychain.clear(KEYCHAIN_ID_ETH_KEY);
                                }} />
                            </View>
                            <View style={styles.claimBlock}>
                                <Text style={styles.switchText}>Family data</Text>
                                <Button style={styles.claimClearButton} label="Clear family data" onPress={() => {
                                    console.log('clear');
                                    Storage.clear(STORAGE_KEY_FAMILY);
                                }} />
                                <Button style={styles.claimClearButton} label="Clear tasks data" onPress={() => {
                                    console.log('clear');
                                    Storage.clear(STORAGE_KEY_TASKS);
                                }} />
                            </View>
                            <View style={styles.claimBlock}>
                                <Button style={styles.claimClearButton} label="Hide panel" onPress={() => {
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
                    <Image style={styles.settingsIcon} source={require('../../components/header/images/settings-icon.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

// export for test
export const DevPanelComponent = DevPanel;

export default connect(
    state => ({
        testUserKey: state.wollo.testUserKey,
        useTestnet: state.wollo.useTestnet,
        configURL: state.config.configURL,
        networkOverride: state.config.networkOverride,
    })
)(DevPanel);
