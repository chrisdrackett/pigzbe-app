import React from 'react';
import {
    Image,
    Text,
    View
} from 'react-native';
import styles from './styles';
import moneyFormat from '../../utils/money-format';
import {daysAgo} from '../../utils/date';
import {ASSET_DPS} from '../../constants';
import images from './images';

export default ({date, amount, direction, assetCode, memo, address}) => (
    <View style={styles.payment}>
        <View style={styles.detail}>
            <View style={styles.info}>
                <Text style={styles.date}>
                    {daysAgo(date)}
                </Text>
                <View style={styles.amountWrapper}>
                    <Text style={styles.amount}>
                        {moneyFormat(amount, ASSET_DPS)} {assetCode}
                    </Text>
                    <Image style={styles.direction} source={images[direction]}/>
                </View>
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
