import ImagePicker from 'react-native-image-picker';
// const ImagePicker = require('react-native-image-picker');

const options = {
    title: 'Select Avatar',
    // customButtons: [
    //   {name: 'fb', title: 'Choose Photo from Facebook'},
    // ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export const openImagePicker = () => {
    return new Promise((resolve, reject) => {
        ImagePicker.showImagePicker(options, (response) => {
        // console.log('Response = ', response);

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
