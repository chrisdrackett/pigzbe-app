import React, {Component} from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import styles from './styles';
import container from '../../styles';

class Overlay extends Component {
    state = {
        isOpen: false
    }

    render() {
        if (this.state.isOpen) {
            return (
                <View style={styles.overlay}>
                    <ScrollView>
                        <View style={[container, styles.inner]}>
                            <Text style={styles.title}>Dev panel</Text>
                            <Text style={styles.text}>Lorem ipsum dolor sit amet</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.settings}
                            onPress={() => this.setState({isOpen: false})}>
                            <Text style={styles.closeBtn}>╳</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            );

        }
        return (
            <TouchableOpacity
                style={styles.settings}
                onPress={() => this.setState({isOpen: true})}
            >
                <Image style={styles.settingsIcon} source={require('../../../../assets/images/settings-icon.png')} />
            </TouchableOpacity>
        );
    }
}

export default Overlay;
