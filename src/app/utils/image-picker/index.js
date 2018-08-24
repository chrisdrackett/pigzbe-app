import ImagePicker from 'react-native-image-picker';
// const ImagePicker = require('react-native-image-picker');

const options = {
    title: 'Select Avatar',
    mediaType: 'photo',
    maxWidth: 200,
    maxHeight: 200
    // customButtons: [
    //   {name: 'fb', title: 'Choose Photo from Facebook'},
    // ],
    // If this key is provided, the image will be saved in your app's
    // Documents directory on iOS, or your app's Pictures directory on Android
    // storageOptions: {
    //     skipBackup: true,
    //     path: 'images'
    // }
};

export const pickImage = () => {
    console.log('pickImage');
    return new Promise((resolve, reject) => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
                reject({error: null});
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                reject({error: response.error});
            // } else if (response.customButton) {
            //     console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = {uri: response.uri};
                resolve({uri: 'data:image/jpeg;base64,' + response.data});
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            // this.setState({
            //     avatarSource: source
            // });
            }
        });
    });
};
