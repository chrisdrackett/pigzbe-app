import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import Wollo from '../wollo';
import Slider from '../slider';

export default class Kids extends Component {

    state = {
        value: 0
    }

    static defaultProps = {
        kids: [],
    }

    onSliderChange = value => this.setState({value})

    render () {
        const {kid} = this.props;

        return (
            <View style={styles.kid}>
                <Text>{kid.name}</Text>
                <Text>{kid.dob}</Text>
                <Text>{kid.address}</Text>
                <Text>{kid.balance}</Text>
                <Text>{this.state.value}</Text>
                <Wollo dark balance={kid.balance} />
                <Slider onValueChange={this.onSliderChange}/>
            </View>
        );
    }
}
