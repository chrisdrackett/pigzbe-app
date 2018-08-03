import TouchID from 'react-native-touch-id';

// support values can be TouchID, FaceID, true and false

export const getSupport = async () => {
    try {
        return await TouchID.isSupported();
    } catch (error) {
        return false;
    }
};

export const authenticate = () => TouchID.isSupported()
    .then(() => TouchID.authenticate('Authenticate with fingerprint'))
    .then(success => {
        console.log('TouchID success', success);
    });

export default module.exports;
