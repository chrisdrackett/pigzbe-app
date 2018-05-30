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

const Inner = ({date, amount, direction, assetCode, memo, address}) => (
    <View>
        <Text style={styles.date}>
            {daysAgo(date)} {dateFormat(date)}
        </Text>
        <Text style={styles.text}>
            {amount} {assetCode} {direction}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.address}>
            {address}
        </Text>
        {memo ? (
            <Text style={styles.text}>
                {memo}
            </Text>
        ) : null}
    </View>
);

export default props => (
    <View style={styles.transaction}>
        {props.link ? (
            <TouchableOpacity onPress={() => openURL(props.link)}>
                <Inner {...props}/>
            </TouchableOpacity>
        ) : (
            <Inner {...props}/>
        )}
    </View>
);
