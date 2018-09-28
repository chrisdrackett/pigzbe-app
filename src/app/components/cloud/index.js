import React, {Component} from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import styles from './styles';

export class Cloud extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
    }

    render() {
        const {value, callback} = this.props;

        return (
            <TouchableOpacity style={styles.outer} onPress={callback}>
                <Image style={styles.cloud} source={require('./images/cloud.png')} />
                <Text style={styles.value}>{value}</Text>
            </TouchableOpacity>
        );
    }
}

export default Cloud;
