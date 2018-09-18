import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import Wollo from '../wollo';
import KidAvatar from '../kid-avatar';
import WolloSendSlider from '../wollo-send-slider';

export default class Kids extends Component {

    static defaultProps = {
        parentBalance: 100,
    }

    onDashboard = () => this.props.onDashboard(this.props.address)

  
    onSend = (amount) => this.props.onSend(this.props.name, this.props.address, amount)

    render () {
        const {name, address, photo, balance, exchange, baseCurrency} = this.props;

        return (
            <View style={styles.kid}>
                <TouchableOpacity style={styles.id} onPress={this.onDashboard}>
                    <KidAvatar photo={photo}/>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.balance}>
                        <Wollo
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
