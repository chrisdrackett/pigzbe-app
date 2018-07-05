import TouchID from 'react-native-touch-id';

export const checkSupport = () => TouchID.isSupported()
    .then(biometryType => {
        console.log('TouchID biometryType:', biometryType);
        if (biometryType === 'TouchID') {
            // Touch ID is supported on iOS
        } else if (biometryType === 'FaceID') {
            // Face ID is supported on iOS
        } else if (biometryType === true) {
            // Touch ID is supported on Android
        }
    })
    .catch(error => {
        // User's device does not support Touch ID (or Face ID)
        // This case is also triggered if users have not enabled Touch ID on their device
        console.log('error', error);
    });

export const authenticate = () => TouchID.isSupported()
    .then(() => TouchID.authenticate('Authenticate with fingerprint'))
    .then(success => {
        console.log('TouchID success', success);
    });
    // .catch(error => {
    //     console.log('TouchID fail', error);
    // // Touch ID Authentication failed (or there was an error)!
    // // Also triggered if the user cancels the Touch ID prompt
    // // On iOS and some Android versions, `error.message` will tell you what went wrong
    // });

export default module.exports;
