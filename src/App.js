import nav from './nav';
// import crypto from './crypto';
import createHash from './create-hash';
// const randomBytes = require('react-native-randombytes');

// const crypto = {
//     createHash,
//     randomBytes
// };
//
// console.log('crypto', Object.keys(crypto).join(','));
// console.log('crypto.createHash', crypto.createHash('sha256').update('Tx hash').digest());
console.log('crypto.createHash', createHash('sha256').update('Tx hash').digest());
// console.log('crypto.randomBytes', crypto.randomBytes(64));
// console.log('crypto.randomBytes', randomBytes(64));

export default nav;
