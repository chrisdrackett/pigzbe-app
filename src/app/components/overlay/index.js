import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
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
                    <View style={container}>
                        <Text style={styles.title}>Overlay</Text>
                        <Text style={styles.text}>Lorem ipsum dolor sit amet</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.setState({isOpen: false})}
                    />
                </View>
            );

        }
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.setState({isOpen: true})}
            />
        );
    }
}

export default Overlay;
