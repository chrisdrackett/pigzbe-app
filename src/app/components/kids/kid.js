import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import Balance from '../balance';
import KidAvatar from '../kid-avatar';
import WolloSendSlider from '../wollo-send-slider';

export default class Kid extends Component {

    onDashboard = () => this.props.onDashboard(this.props.address)

    render () {
        const {name, address, photo, balance, exchange, baseCurrency} = this.props;

        return (
            <View style={styles.kid}>
                <TouchableOpacity style={styles.id} onPress={this.onDashboard}>
                    <KidAvatar photo={photo}/>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.balance}>
                        <Balance
                            dark
                            balance={balance}
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
