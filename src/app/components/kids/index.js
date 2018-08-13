import React, {Component, Fragment} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import Button from '../button';
import Kid from './kid';
import {familyAddKid, loadFamily} from '../../actions';

export default class Kids extends Component {

    static defaultProps = {
        kids: []
    }

    componentDidMount() {
        this.props.dispatch(loadFamily());
    }

    onAddKids = () => {
        this.props.dispatch(familyAddKid('Name', '01/01/2012', null));
    }

    onSliderChange = value => this.setState({value})

    render () {
        const {kids, exchange, baseCurrency} = this.props;

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
                            />
                        ))}
                    </Fragment>
                )}
            </View>
        );
    }
}
