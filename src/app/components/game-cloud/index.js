import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import GameWollo from '../game-wollo';
import styles from './styles';
import {
    TRANSFER_TYPE_TASK,
    TRANSFER_TYPE_GIFT,
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
        const {value, type, callback, name, happy, raining} = this.props;
        const text = type === TRANSFER_TYPE_TASK ? name : (type === TRANSFER_TYPE_GIFT ? 'Gift' : 'Allowance');
        const cloudImage = happy ? require('./images/happy_cloud.png') :
            (raining ? require('./images/sad_cloud.png') : require('./images/cloud.png'));

        return (
            <View style={styles.outer}>
                <TouchableOpacity onPress={callback} style={styles.touchable}>
                    <Image style={styles.cloud} source={cloudImage} />
                    {!happy && <View style={styles.content}>
                        <View style={[raining ? styles.raining : {}]}>
                            <GameWollo value={value} small />
                        </View>
                        {!raining && <Text style={styles.type}>{text}</Text>}
                    </View>}
                </TouchableOpacity>
                {raining && <View style={styles.rain} pointerEvents="none" />}
            </View>
        );
    }
}

export default Cloud;
