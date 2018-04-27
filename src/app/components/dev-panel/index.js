import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Switch
} from 'react-native';
import styles from './styles';
import container from '../../styles';
import {setUseTestnet} from '../../actions';

class DevPanel extends Component {
    state = {
        isOpen: false
    }

    render() {
        const {
            dispatch,
            useTestnet
        } = this.props;

        if (this.state.isOpen) {
            return (
                <View style={styles.overlay}>
                    <ScrollView>
                        <View style={[container, styles.inner]}>
                            <Text style={styles.title}>Dev panel</Text>
                            <View style={styles.switch}>
                                <Text style={styles.text}>
                                    Use Testnet?
                                </Text>
                                <Switch
                                    value={useTestnet}
                                    onValueChange={value => dispatch(setUseTestnet(value))}
                                />
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
                    <Image style={styles.settingsIcon} source={require('../../../../assets/images/settings-icon.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

// export for test
export const DevPanelComponent = DevPanel;

export default connect(
    state => ({
        useTestnet: state.wollo.useTestnet
    })
)(DevPanel);
