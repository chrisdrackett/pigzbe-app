import bip39 from 'bip39';
import hdkey from 'ethereumjs-wallet/hdkey';
import Config from 'react-native-config';

export const generateAddressFromSeed = (seed, publicAddress) => {
    const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(seed));
    const wallet_hdpath = 'm/44\'/60\'/0\'/0/';

    let account = {address: ''};
    let counter = 0;
    while (account.address.toLowerCase() !== publicAddress.toLowerCase()) {
        const wallet = hdwallet.derivePath(wallet_hdpath + counter).getWallet();
        const address = '0x' + wallet.getAddress().toString('hex');
        const privateKey = wallet.getPrivateKey().toString('hex');
        account = {address: address, privateKey: privateKey};
        counter++;
    }

    return account;
};


export const watchConfirmations = ({
    web3,
    transactionHash,
    validations,
    onValidatedBlock,
}) => new Promise((resolve, reject) => {
    let loop = 0;
    let timeout = 0;
    let validatedBlocks = 0;

    const checkConfirmations = async (receipt) => {
        clearTimeout(timeout);
        timeout = 0;
        const blockNumber = await web3.eth.getBlockNumber();
        if (blockNumber - receipt.blockNumber > validatedBlocks) {
            validatedBlocks = blockNumber - receipt.blockNumber;
            if (onValidatedBlock) {
                onValidatedBlock(validatedBlocks);
            }
        }

        if (Config.NETWORK === 'local') {
            resolve(receipt);
            return;
        }

        if (validatedBlocks >= validations) {
            resolve(receipt);
            return;
        }

        loop++;
        timeout = setTimeout(checkConfirmations, 2000, receipt);
    };

    const loopCheckConfirmation = async () => {
        clearTimeout(timeout);
        timeout = 0;
        console.log('loopCheckConfirmation');
        console.log(loop);

        try {
            const receipt = await web3.eth.getTransaction(transactionHash);
            console.log(receipt);
            if (receipt.blockNumber) {
                loop = 0;
                clearTimeout(timeout);
                checkConfirmations(receipt);
                // const blockNumber = await web3.eth.getBlockNumber();
                // console.log(blockNumber, receipt.blockNumber, blockNumber - receipt.blockNumber);
            } else {
                loop++;
                timeout = setTimeout(loopCheckConfirmation, 2000);
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    };

    loopCheckConfirmation();
});
