import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import GameCloud from '../game-cloud';
import styles from './styles';

export class CloudFlow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: null,
        };
    }

    componentDidMount() {
    }

    render() {
        const {value, type, callback, name} = this.props;

        return (
            <View style={styles.outer} onPress={callback}>
                <GameCloud type={type} value={value} name={name} />
            </View>
        );
    }
}

export default CloudFlow;
