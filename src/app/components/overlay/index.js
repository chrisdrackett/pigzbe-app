import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import ButtonIcon from '../button-icon';
import styles from './styles';
import images from './images';

const conversions = {
    banana: {
        conversion: 5,
        label: 'bananas',
    },
    gold: {
        conversion: 100000,
        label: 'gold',
    },
    dollar: {
        conversion: 1000,
        label: 'dollars',
    }
};

class Overlay extends Component {
    state = {
        isOpen: false,
        conversionKey: 'banana',
    }

    onClick = (e) => {
        const key = e.currentTarget.dataset.icon;
        this.setState({
            conversionKey: key,
        });
    }

    conversionString() {
        return `${this.props.coins / conversions[this.state.conversionKey].conversion} ${conversions[this.state.conversionKey].label}`;
    }

    returnCoinsIcons(num, icon) {
        const icons = [];
        for (let i = 0; i < num; i++) {
            icons.push(<Image style={styles.coin} key={i} source={images[icon]} />);
        }

        return <View style={styles.containerCoins}>{icons}</View>;
    }

    render() {
        if (this.state.isOpen) {
            return (
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Let's learn!</Text>
                        <Text style={styles.text}>How much is your Wollo worth</Text>
                        <View style={styles.containerButtons}>
                            {Object.keys(conversions).map(b => <ButtonIcon onClick={this.onClick} key={b} icon={b} />)}
                        </View>
                        <Text style={styles.text}>1 Wollo coin is worth {conversions[this.state.conversionKey].conversion} {conversions[this.state.conversionKey].label}</Text>
                        <Text style={styles.text}>Your {this.props.coins} Wollo coins = {this.conversionString()}</Text>
                        <View style={styles.containerComparison}>
                            <View style={styles.containerBlockCompare}>
                                {this.returnCoinsIcons(15, 'wollo')}
                                <Text style={styles.textCompare}>Your {this.props.coins} Wollo</Text>
                            </View>
                            <Text style={styles.equal}>=</Text>
                            <View style={styles.containerBlockCompare}>
                                {this.returnCoinsIcons(15, this.state.conversionKey)}
                                <Text style={styles.textCompare}>{this.conversionString()}</Text>
                            </View>
                        </View>
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
