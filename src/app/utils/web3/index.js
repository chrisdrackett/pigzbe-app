import bip39 from 'bip39';
import hdkey from 'ethereumjs-wallet/hdkey';

export const isValidSeed = seed => {
    if (!seed.trim()) {
        return false;
    }

    const numWords = seed.trim().split(/\s+/g).length;
    if (numWords !== 12) {
        return false;
    }

    return Object.keys(bip39.wordlists)
        .some(key => bip39.validateMnemonic(seed.trim(), bip39.wordlists[key]));
};

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

        if (counter > 100) {
            throw new Error('Please check your 12 memorable words');
        }
    }

    return account;
};

export const deriveMnemonicAccounts = (seed, count = 10) => {
    const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(seed));
    const wallet_hdpath = 'm/44\'/60\'/0\'/0/';

    const accounts = [];
    let counter = 0;
    while (counter < count) {
        const wallet = hdwallet.derivePath(wallet_hdpath + counter).getWallet();
        const address = '0x' + wallet.getAddress().toString('hex');
        const privateKey = wallet.getPrivateKey().toString('hex');
        accounts.push({publicKey: address, privateKey: privateKey});
        counter++;
    }

    return accounts;
};

export const watchConfirmations = ({
    network,
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

        if (network === 'local') {
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
            if (receipt && receipt.blockNumber) {
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
