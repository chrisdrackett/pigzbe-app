
import moment from 'moment';
import {
    sendPayment,
    paymentHistory,
    paymentInfo,
} from '@pigzbe/stellar-utils';
import {getKeys, loadConfig, setAllowance} from 'app/actions';
import {wolloAsset} from 'app/selectors';
import {MEMO_PREPEND_ALLOWANCE} from 'app/constants';
import formatMemo from 'app/utils/format-memo';

export const intervals = ['Daily', 'Weekly', 'Fortnightly', 'Monthly'];
export const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const daysOfMonth = ['1st', '15th'];

export const getFirstPaymentDate = ({timeNow = moment(), interval, day = null}) => {
    if (interval === 'Weekly' || interval === 'Fortnightly') {
        const dayNeeded = daysOfWeek.indexOf(day) + 1;
        const today = timeNow.isoWeekday();

        // if we haven't yet passed the day of the week that I need:
        if (today <= dayNeeded) {
            // then just give me this week's instance of that day
            return timeNow.clone().isoWeekday(dayNeeded);
        } else {
            // otherwise, give me *next week's* instance of that same day
            return timeNow.clone().add(1, 'week').isoWeekday(dayNeeded);
        }
    } else if (interval === 'Daily') {
        return timeNow.clone();
    } else { // interval is monthly
        if (timeNow.date() === 1 && day === '1st' || timeNow.date() === 15 && day === '15st') {
            return timeNow.clone();
        } else {
            if (day === '1st') {
                return timeNow.clone().add(1, 'month').date(1);
            } else if (timeNow.date() < 15 && day === '15th') {
                return timeNow.clone().date(15);
            }
            return timeNow.clone().add(1, 'month').date(15);
        }
    }
};

export const getNextPaymentDate = ({lastPaymentDate, interval, day = null}) => {
    if (interval === 'Daily') {
        return lastPaymentDate.clone().add(1, 'day');
    } else if (interval === 'Weekly') {
        const dayNeeded = daysOfWeek.indexOf(day) + 1;
        return lastPaymentDate.clone().add(1, 'week').isoWeekday(dayNeeded);
    } else if (interval === 'Fortnightly') {
        const dayNeeded = daysOfWeek.indexOf(day) + 1;
        return lastPaymentDate.clone().add(2, 'weeks').isoWeekday(dayNeeded);
    } else { // interval is monthly
        const dayNeeded = day === '1st' ? 1 : 15;
        return lastPaymentDate.clone().add(1, 'month').date(dayNeeded);
    }
};

const getMemo = (kid, allowance, payment) => {
    return formatMemo(`${MEMO_PREPEND_ALLOWANCE}#${allowance.id}.${payment.id} to ${kid.name}`);
};

export const handleAllowances = async ({dispatch, getState}) => {
    try {
        // configure which server to use etc
        await loadConfig()(dispatch, getState);

        const keypair = await getKeys()(dispatch, getState);
        if (!keypair) {
            return;
        }

        const dateNow = moment();
        const publicKey = keypair.publicKey();
        const secretKey = keypair.secret();

        const kids = getState().kids.kids;

        let cachedPayments = null;
        const getPayments = async (publicKey, toAddress = null) => {
            if (!cachedPayments) {
                const rawData = await paymentHistory(publicKey);
                const filteredData = rawData.filter(p => p.type !== 'account_merge');
                cachedPayments = await Promise.all(filteredData.map(p => paymentInfo(p, publicKey)));
                cachedPayments = cachedPayments.filter(payment => payment.assetCode === 'WLO');
            }
            return cachedPayments.filter(payment => !toAddress || toAddress === payment.to);
        };

        for (const kid of kids) {
            for (const allowance of (kid.allowances || [])) {
                const {payments} = allowance;

                // Firsly, loop back through payments to see if any are pending. If so we will
                // want to check if the transaction exists or not, to update the status
                for (let i = payments.length - 1; i >= 0; i--) {
                    const payment = payments[i];
                    if (payment.status !== 'pending') {
                        break;
                    }

                    const memo = getMemo(kid, allowance, payment);
                    const transactions = await getPayments(publicKey, kid.address);

                    let found = false;
                    for (let j = transactions.length - 1; j >= 0; j--) {
                        const transaction = transactions[j];
                        if (transaction.memo === memo) {
                            found = true;
                            payment.status = 'success';
                            break;
                        }
                    }
                    if (!found) {
                        payment.status = 'failed';
                        payment.reason = 'No transaction found';
                    }
                }

                const nextPaymentDate = moment(allowance.nextDate);

                if (nextPaymentDate.format('L') === dateNow.format('L')) {
                    // Do a payment!
                    const payment = {
                        id: payments.length === 0 ? 1 : (payments[payments.length - 1].id + 1),
                        status: 'pending',
                    };

                    const memo = getMemo(kid, allowance, payment);
                    const asset = wolloAsset(getState());

                    try {
                        const result = await sendPayment(secretKey, kid.address, allowance.amount, memo, asset);
                    } catch (err) {
                        console.log('failed', err);
                        payment.status = 'failed';
                        payment.reason = 'Transaction failed with: ' + err.message;
                    }
                    payment.status = 'success';
                    allowance.payments.push(payment);

                    allowance.nextDate = getNextPaymentDate({
                        lastPaymentDate: nextPaymentDate,
                        interval: allowance.interval,
                        day: allowance.day,
                    }).toISOString();
                }

                dispatch(setAllowance(allowance));
            }
        }
    } catch (err) {
        console.log('err');
        console.log(err);
    }

};
