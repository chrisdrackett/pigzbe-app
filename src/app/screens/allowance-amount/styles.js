import {StyleSheet, Dimensions} from 'react-native';
import {color} from '../../styles';

const getWidth = () => Math.min(Dimensions.get('window').width, 500);

export default StyleSheet.create({
    wrapper: {
        marginBottom: 20,
        marginLeft: getWidth() / 50,
        marginRight: getWidth() / 50,
    },
    button: {
        backgroundColor: 'transparent',
        borderColor: color.blue,
        fontSize: 14,
        paddingTop: 10,
        height: (getWidth() / 8) + 10,
        lineHeight: getWidth() / 8,
        width: getWidth() / 8,
        textAlign: 'center',
    },
    textInput: {
        color: color.blue,
        backgroundColor: color.pink,
        borderColor: color.pink,
        fontSize: 14,
        fontWeight: 'bold',
        height: getWidth() / 8,
        // lineHeight: getWidth() / 8,
        width: getWidth() / 4 + getWidth() / 25,
        textAlign: 'left',
        borderRadius: getWidth() / 12,
        paddingLeft: 20,
        paddingRight: 40,
    },
    textInputWrapper: {
        marginTop: 10,
        position: 'relative',
        marginBottom: -10,
    },
    inner: {
        borderRadius: getWidth() / 16,
        lineHeight: getWidth() / 8,
        display: 'flex',
        borderWidth: 1,
        alignContent: 'center',
        justifyContent: 'center',
        height: getWidth() / 8,
        textAlign: 'center',
    },
    innerText: {
        backgroundColor: color.white,
        borderColor: color.mediumBlue,
        color: color.mediumBlue,
        fontSize: 20,
        lineHeight: getWidth() / 9,
    },
    cancel: {
        position: 'absolute',
        top: getWidth() / 25,
        right: getWidth() / 35,
    },
    cancelImage: {
        color: color.mediumBlue,
        width: getWidth() / 30,
        width: Dimensions.get('window').height / 30,
    },
    flex: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
    },
    toggleList: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    conversion: {
        color: color.blue,
        width: '100%',
        marginTop: 15,
        textAlign: 'center',
    }
});
