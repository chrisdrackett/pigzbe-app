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
import {setUseTestnet, authTestUser} from '../../actions';

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
}];

class DevPanel extends Component {
    state = {
        isOpen: false
    }

    render() {
        const {
            dispatch,
            useTestnet,
            testUserKey
        } = this.props;

        if (!window.__DEV__) {
            return null;
        }

        if (this.state.isOpen) {
            return (
                <View style={styles.overlay}>
                    <ScrollView>
                        <View style={[container, styles.inner]}>
                            <Text style={styles.title}>Dev panel</Text>
                            <Text style={styles.switchText}>
                                Env dev: {window.__DEV__ ? 'true' : 'false'}
                            </Text>
                            <SwitchControl
                                label={'Use Testnet?'}
                                value={useTestnet}
                                onValueChange={value => dispatch(setUseTestnet(value))}
                            />
                            <Text style={styles.switchText}>
                                Select test user
                            </Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={testUserKey}
                                    onValueChange={value => dispatch(authTestUser(value))}>
                                    {testUsers.map(user => (
                                        <Picker.Item
                                            key={user.label}
                                            label={user.label}
                                            value={user.secretKey}
                                        />
                                    ))}
                                </Picker>
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
                    style={useTestnet ? styles.net : [styles.net, styles.netLive]}>
                    {useTestnet ? 'TESTNET' : 'LIVENET'}
                </Text>
                <TouchableOpacity
                    style={styles.settings}
                    onPress={() => this.setState({isOpen: true})}>
                    <Image style={styles.settingsIcon} source={require('../header/images/settings-icon.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

// export for test
export const DevPanelComponent = DevPanel;

export default connect(
    state => ({
        testUserKey: state.auth.testUserKey,
        useTestnet: state.wollo.useTestnet
    })
)(DevPanel);
