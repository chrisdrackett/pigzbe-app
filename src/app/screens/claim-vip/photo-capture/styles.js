import {StyleSheet} from 'react-native';

import {
    paddingH,
    color,
    fontFamily,
} from 'app/styles';

export default StyleSheet.create({
    bg: {
        backgroundColor: color.darkGrey,
        flex: 1,
        paddingBottom: 30,
        justifyContent: 'space-between',
    },
    bgConfirm: {
        backgroundColor: color.white,
    },
    preview: {
        marginTop: 70,
        display: 'flex',
        alignItems: 'center'
    },
    camera: {

    },
    cameraButton: {
        alignSelf: 'center',
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: color.blue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraIcon: {
        width: 28,
        height: 24,
        marginBottom: 4,
    },
    instructions: {
        color: color.white,
        width: '65%',
        alignSelf: 'center',
    },
    heading: {
        color: color.white,
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 40,
    },
    confirmText: {
        color: color.blue,
    },
    buttons: {
        width: '88.75%',
        alignSelf: 'center',
        paddingLeft: paddingH,
        paddingRight: paddingH,
    }
});
