import React from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import styles from './styles';
import openURL from '../../utils/open-url';
import {daysAgo, dateFormat} from '../../utils/date';

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
