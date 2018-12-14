import Device from 'app/utils/device';

const toAscii = str => str.replace(/[^\x00-\x7F]/g, '').split('').map(ch => ch.charCodeAt(0));

const toText = arr => arr.map(ch => String.fromCharCode(ch)).join('');

export const deviceSendTask = taskName => async () => {
    console.log('deviceSendTask', taskName);
    const ascii = toAscii(taskName);
    console.log('ascii', ascii);
    console.log('text', toText(ascii));
    try {
        const bytes = [0x01, ...ascii, 0];
        console.log('bytes', bytes);
        Device.send(bytes);
    } catch (error) {
        console.log(error);
    }
};

const toBytes = num => [parseInt(num, 10) & 0xFF, (parseInt(num, 10) >> 8) & 0xFF];

const toInt = bytes => bytes[0] | bytes[1] << 8;

export const deviceReceiveWollo = (amount, balance) => async () => {
    console.log('deviceReceiveWollo', amount, balance);

    // const lsb  = amount & 0xFF;
    // const msb = (amount >> 8) & 0xFF;

    const amountBytes = toBytes(amount);
    const balanceBytes = toBytes(balance);

    console.log('amt', toInt(amountBytes));
    console.log('bal', toInt(balanceBytes));

    try {
        const bits = [0x02, ...amountBytes, ...balanceBytes];
        console.log('bits', bits);
        Device.send(bits);
    } catch (error) {
        console.log(error);
    }
};
