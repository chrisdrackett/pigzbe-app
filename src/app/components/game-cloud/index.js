import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image, Animated, Dimensions} from 'react-native';
import GameWollo from '../game-wollo';
import styles from './styles';
import {
    TRANSFER_TYPE_TASK,
    TRANSFER_TYPE_GIFT,
} from 'app/constants/game';

export class Cloud extends Component {
    constructor(props) {
        super(props);

        const rainHeight = Dimensions.get('window').height - 278;

        this.state = {
            rainBottomPosition: new Animated.Value(0),
            rainTopPosition: new Animated.Value(66),
            rainHeight,
        };
    }

    componentDidUpdate(prevProps) {
        console.log('prevProps', prevProps, 'props', this.props);
        if (!prevProps.raining && this.props.raining) {
            // not raining -> raining
            // reset values so we can animate top down again
            this.state.rainTopPosition.setValue(66);
            this.state.rainBottomPosition.setValue(0);

            Animated.timing(this.state.rainBottomPosition, {
                toValue: this.state.rainHeight * -1,
                duration: 500,
            }).start();
        } else if (prevProps.raining && !this.props.raining) {
            // raining -> not raining
            Animated.timing(this.state.rainTopPosition, {
                toValue: Dimensions.get('window').height - 279 + 66,
                duration: 500,
            }).start();
        }
    }

    render() {
        const {value, type, callback, name, happy, raining} = this.props;
        const {rainBottomPosition, rainTopPosition} = this.state;
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
                <Animated.View style={[styles.rain, {bottom: rainBottomPosition, top: rainTopPosition}]} pointerEvents="none" />
            </View>
        );
    }
}

export default Cloud;
