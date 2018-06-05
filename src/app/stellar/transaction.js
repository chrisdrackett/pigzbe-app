import {Transaction} from './';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import {getServer} from './server';

const getTx = txXDR => new Transaction(txXDR);

const currentTime = () => new BigNumber(moment().format('X'));

const tooSoon = tx => {
    const minTime = new BigNumber(tx.timeBounds.minTime);
    console.log('minTime', minTime);
    return minTime.greaterThan(currentTime());
};

const loadTransaction = hash => getServer().transactions().transaction(hash).call();

const executed = async tx => {
    let txInfo = null;
    try {
        txInfo = await loadTransaction(tx.hash().toString('hex'));
    } catch (e) {}
    return txInfo;
};

export const validate = xdr => new Promise(resolve => {
    const tx = getTx(xdr);

    const isTooSoon = tooSoon(tx);

    if (isTooSoon) {
        resolve({
            isValid: false,
            isExecuted: false,
            isTooSoon,
        });
        return;
    }

    executed(tx).then(txInfo => {
        const isExecuted = !!txInfo;
        console.log('txInfo', txInfo);
        resolve({
            isValid: !isExecuted,
            isExecuted,
            isTooSoon,
            txId: txInfo ? txInfo.id : null
        });
    });
});
