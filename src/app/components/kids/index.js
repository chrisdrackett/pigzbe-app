import React, {Component, Fragment} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import Button from '../button';
import Kid from './kid';

export default class Kids extends Component {

    static defaultProps = {
        kids: []
    }

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
                            onPress={this.props.onAddKids}
                        />
                    </View>
                ) : (
                    <Fragment>
                        <TouchableOpacity style={styles.plus} onPress={this.props.onAddKids}>
                            <Image style={styles.plusIcon} source={require('./images/plus.png')} />
                        </TouchableOpacity>
                        {kids.map((kid, i) => (
                            <Kid
                                key={i}
                                {...kid}
                                exchange={exchange}
                                baseCurrency={baseCurrency}
                                parentBalance={parentBalance}
                                onSend={this.props.onSend}
                                onDashboard={this.props.onDashboard}
                            />
                        ))}
                    </Fragment>
                )}
            </View>
        );
    }
}
