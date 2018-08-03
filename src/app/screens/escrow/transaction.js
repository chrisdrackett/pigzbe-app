import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import moment from 'moment';
import Button from '../../components/button';
import {
    ASSET_CODE,
    COIN_DPS
} from '../../constants';
import {
    submitTransaction,
    viewTransaction
} from '../../actions';
import moneyFormat from '../../utils/money-format';

const daysToGo = date => {
    const str = moment.unix(date).fromNow();
    return str.slice(0, 1).toUpperCase() + str.slice(1);
};

const getButtonStyle = validation => {
    if (validation.isValid) {
        return styles.btn;
    }

    if (validation.isExecuted) {
        return [styles.btn, styles.claimed];
    }

    return [styles.btn, styles.disabled];
};

const getButtonTextStyle = validation => {
    if (validation.isValid) {
        return null;
    }

    if (validation.isExecuted) {
        return styles.claimedText;
    }

    return styles.disabledText;
};

export default ({
    dispatch,
    date,
    amount,
    xdr,
    validation = {}
}) => (
    <View style={styles.transaction}>
        <View style={styles.inner}>
            <View style={styles.detail}>
                <Text style={styles.date}>
                    {daysToGo(date)}
                </Text>
                <Text style={styles.amount}>
                    {moneyFormat(amount, COIN_DPS[ASSET_CODE])} {ASSET_CODE}
                </Text>
            </View>
            <Button
                label={validation.isExecuted ? 'Done' : 'Claim'}
                disabled={!validation.isValid || validation.isExecuted}
                style={getButtonStyle(validation)}
                textStyle={getButtonTextStyle(validation)}
                onPress={() => {
                    if (validation.isValid) {
                        dispatch(submitTransaction(xdr));
                    } else {
                        dispatch(viewTransaction(validation.txId));
                    }
                }}
            />
        </View>
    </View>
);
