import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Logo from '../logo';
import styles from './styles';

export default class extends Component {
    render() {
        const {onSettings, onBack} = this.props;

        return (
            <View style={styles.container}>
                <Logo />
                {onSettings &&
                    <TouchableOpacity style={styles.settings} onPress={onSettings}>
                        <Image style={styles.settingsIcon} source={require('./images/settings-icon.png')} />
                    </TouchableOpacity>
                }
                {onBack && (
                    <TouchableOpacity style={styles.back} onPress={onBack}>
                        <Image style={styles.backIcon} source={require('./images/btn_back.png')}/>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}
