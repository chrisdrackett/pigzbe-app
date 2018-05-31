import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import styles from './styles';
import openURL from '../../utils/open-url';
import moneyFormat from '../../utils/money-format';
import {daysAgo} from '../../utils/date';
import {ASSET_DPS} from '../../constants';
import images from './images';

const Inner = ({date, amount, direction, assetCode, memo, address}) => (
    <View>
        <View style={styles.detail}>
            <View style={styles.info}>
                <Text style={styles.date}>
                    {daysAgo(date)}
                </Text>
                <Text style={styles.amount}>
                    {moneyFormat(amount, ASSET_DPS)} {assetCode} <Image style={styles.direction} source={images[direction]}/>
                </Text>
            </View>
            <Text numberOfLines={3} style={styles.address}>
                {address}
            </Text>
        </View>
        {memo ? (
            <Text style={styles.memo}>
                {memo}
            </Text>
        ) : null}
    </View>
);

export default props => (
    <View style={styles.payment}>
        {props.link ? (
            <TouchableOpacity onPress={() => openURL(props.link)}>
                <Inner {...props}/>
            </TouchableOpacity>
        ) : (
            <Inner {...props}/>
        )}
    </View>
);
