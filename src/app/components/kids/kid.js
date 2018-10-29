import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import BigNumber from 'bignumber.js';
import Wollo from '../wollo';
import KidAvatar from '../kid-avatar';
import WolloSendSlider from '../wollo-send-slider';

export default class Kid extends Component {

    onDashboard = () => this.props.onDashboard(this.props.address)

    render () {
        const {name, address, photo, goals, exchange, baseCurrency} = this.props;

        const totalWollo = goals.reduce((n, g) => {
            return n.plus(g.balance);
        }, new BigNumber(0)).toString(10);

        return (
            <View style={styles.kid}>
                <TouchableOpacity style={styles.id} onPress={this.onDashboard}>
                    <KidAvatar photo={photo}/>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.balance}>
                        <Wollo
                            dark
                            balance={totalWollo}
                            exchange={exchange}
                            baseCurrency={baseCurrency}
                        />
                        <Image style={styles.chevron} source={require('./images/chevron.png')}/>
                    </View>
                </TouchableOpacity>

                <WolloSendSlider
                    name={name}
                    address={address}
                />
            </View>
        );
    }
}
