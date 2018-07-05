// const remote = window.require('electron').remote;
// const main = remote.require('./main.js');
// const {keytar} = main;
// FIXME: current version of keytar not working current version of electron

// const service = 'pigzbe';
// const account = 'pigzbekey';

export const KEYCHAIN_NO_CREDENTIALS_STORED = 'No credentials stored';
export const KEYCHAIN_NO_ACCESS = 'Keychain could not be accessed';

export const save = () => Promise.resolve();
export const load = () => Promise.resolve({
    key: null,
    error: new Error(KEYCHAIN_NO_ACCESS)
});
export const clear = () => Promise.resolve();

// export const save = async key => await keytar.addPassword(service, account, key);
//
// export const load = async () => {
//     let key = null;
//     let error = null;
//
//     try {
//         key = await keytar.getPassword(service, account);
//
//         if (!key) {
//             error = new Error(KEYCHAIN_NO_CREDENTIALS_STORED);
//         }
//     } catch (err) {
//         error = new Error(KEYCHAIN_NO_ACCESS);
//         console.log(err);
//     }
//
//     return {
//         key,
//         error
//     };
// };
//
// export const clear = async () => await keytar.deletePassword(service, account);

export default module.exports;
