import React from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import styles from './styles';
import moment from 'moment';
import openURL from '../../utils/open-url';

const daysAgo = date => {
    const str = moment(date).fromNow();
    return str.slice(0, 1).toUpperCase() + str.slice(1);
};

const dateFormat = date => moment(date).format('LL');

const Inner = ({date, text}) => (
    <View>
        <Text style={styles.date}>
            {daysAgo(date)} {dateFormat(date)}
        </Text>
        <Text style={styles.text}>
            {text}
        </Text>
    </View>
);

export default props => (
    <View style={styles.message}>
        {props.link ? (
            <TouchableOpacity onPress={() => openURL(props.link)}>
                <Inner {...props}/>
            </TouchableOpacity>
        ) : (
            <Inner {...props}/>
        )}
    </View>
);
