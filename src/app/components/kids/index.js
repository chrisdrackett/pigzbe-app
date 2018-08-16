import React, {Component, Fragment} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import Button from '../button';
import Kid from './kid';
import {familyAddKid} from '../../actions';

export default class Kids extends Component {

    static defaultProps = {
        kids: []
    }

    onAddKids = () => {
        const names = ['Ella', 'Sebastian', 'Billy', 'Bobby'];
        const name = names[this.props.kids.length] || `Name ${this.props.kids.length}`;
        this.props.dispatch(familyAddKid(name, '01/01/2012', null));
    }

    onSend = (name, address, amount) => this.props.onSend(name, address, amount)

    render () {
        const {kids, exchange, baseCurrency, parentBalance} = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Kids wallets</Text>
                {!kids.length ? (
                    <View style={styles.add}>
                        <Button
                            label="Add My Children"
                            theme="light"
                            onPress={this.onAddKids}
                        />
                    </View>
                ) : (
                    <Fragment>
                        <TouchableOpacity style={styles.plus} onPress={this.onAddKids}>
                            <Image style={styles.plusIcon} source={require('./images/plus.png')} />
                        </TouchableOpacity>
                        {kids.map((kid, i) => (
                            <Kid
                                key={i}
                                {...kid}
                                exchange={exchange}
                                baseCurrency={baseCurrency}
                                parentBalance={parentBalance}
                                onSend={this.onSend}
                            />
                        ))}
                    </Fragment>
                )}
            </View>
        );
    }
}
