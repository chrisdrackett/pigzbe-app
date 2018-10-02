import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import GameWollo from '../game-wollo';
import styles from './styles';
import {
    TRANSFER_TYPE_TASK,
} from 'app/constants/game';

export class Cloud extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
    }

    render() {
        const {value, type, callback, name, happy} = this.props;
        const text = type !== TRANSFER_TYPE_TASK ? type : name;

        return (
            <TouchableOpacity style={styles.outer} onPress={callback}>
                <Image style={styles.cloud} source={happy ? require('./images/happy_cloud.png') : require('./images/cloud.png')} />
                {!happy && <View style={styles.content}>
                    <View style={styles.value}>
                        <GameWollo value={value} small />
                    </View>
                    <Text style={styles.type}>{text}</Text>
                </View>}
            </TouchableOpacity>
        );
    }
}

export default Cloud;
