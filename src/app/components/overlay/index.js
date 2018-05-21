import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import ButtonIcon from '../button-icon';
import Counter from '../counter';
import styles from './styles';
import images from './images';
import moneyFormat from '../../utils/money-format';

const conversions = {
    carrot: {
        conversion: 1,
        label: 'carrots',
        labelOne: 'carrot',
        dp: 2,
    },
    gold: {
        conversion: 0.0027,
        label: 'grams of gold',
        labelOne: 'gram of gold',
        dp: 4,
    },
    dollar: {
        conversion: 0.12,
        label: 'dollars',
        labelOne: 'dollar',
        dp: 2,
    }
};

class Overlay extends Component {
    state = {
        isOpen: false,
        conversionKey: 'carrot',
    }

    render() {
        const {wolloCollected} = this.props;
        const {conversionKey} = this.state;
        const {conversion, label, labelOne, dp} = conversions[conversionKey];
        const compareValue = moneyFormat(String(wolloCollected * conversion), dp);

        if (this.state.isOpen) {
            return (
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.close} onPress={() => this.setState({isOpen: false})}>
                            <Image style={styles.closeImg} source={images.close} />
                        </TouchableOpacity>
                        <Image style={styles.rabbit} source={images.rabbit} />
                        <Text style={styles.title}>Let's learn!</Text>
                        <Text style={styles.text}>How much is Wollo worth in...</Text>
                        <View style={styles.containerButtons}>
                            {Object.keys(conversions).map(b => (
                                <ButtonIcon
                                    key={b}
                                    onClick={() => this.setState({conversionKey: b})}
                                    icon={images.icon[b]}
                                    selected={conversionKey === b}
                                />
                            ))}
                        </View>
                        <Text style={styles.text}>1 Wollo is worth {conversion} {conversion === 1 ? labelOne : label}</Text>
                        <View style={styles.containerComparison}>
                            <View style={styles.containerBlockCompare}>
                                <Image style={styles.pile} source={images.wollo} />
                                <Text style={styles.textCompare}>Your {wolloCollected} Wollo</Text>
                            </View>
                            <Image style={styles.equals} source={images.equals}/>
                            <View style={styles.containerBlockCompare}>
                                <Image style={styles.pile} source={images.pile[conversionKey]} />
                                <Text style={styles.textCompare}>
                                    {`${compareValue} ${wolloCollected === 1 ? labelOne : label}`}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            );

        }
        return (
            <View style={styles.button}>
                <Counter
                    value={wolloCollected}
                    onPress={() => this.setState({isOpen: true})}
                />
            </View>
        );
    }
}

export default connect(state => ({
    wolloCollected: state.game.wolloCollected
}))(Overlay);
