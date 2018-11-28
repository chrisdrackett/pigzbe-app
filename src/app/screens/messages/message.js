import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
import {daysAgo} from '../../utils/date';

const Inner = ({date, text}) => (
    <View>
        <Text style={styles.date}>
            {/* {daysAgo(date)} {dateFormat(date)} */}
            {daysAgo(date)}
        </Text>
        <Text style={styles.text}>
            {text}
        </Text>
    </View>
);

export default class Message extends Component {
    onOpenLink = () => this.props.onOpenLink(this.props.link)

    render() {
        return (
            <View style={styles.message}>
                {this.props.link ? (
                    <TouchableOpacity onPress={this.onOpenLink}>
                        <Inner {...this.props}/>
                        <Image style={styles.chevron} source={require('./images/chevron.png')}/>
                    </TouchableOpacity>
                ) : (
                    <Inner {...this.props}/>
                )}
            </View>
        );
    }
}
