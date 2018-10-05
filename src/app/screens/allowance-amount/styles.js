import {StyleSheet, Dimensions} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    wrapper: {
        marginBottom: 20,
        marginLeft: Dimensions.get('window').width / 50,
        marginRight: Dimensions.get('window').width / 50,
    },
    button: {
        backgroundColor: 'transparent',
        borderColor: color.blue,
        fontSize: 14,
        paddingTop: 10,
        height: (Dimensions.get('window').width / 8) + 10,
        lineHeight: Dimensions.get('window').width / 8,
        width: Dimensions.get('window').width / 8,
        textAlign: 'center',
    },
    textInput: {
        color: color.blue,
        backgroundColor: color.pink,
        borderColor: color.pink,
        fontSize: 14,
        fontWeight: 'bold',
        height: Dimensions.get('window').width / 8,
        // lineHeight: Dimensions.get('window').width / 8,
        width: Dimensions.get('window').width / 4 + Dimensions.get('window').width / 25,
        textAlign: 'left',
        borderRadius: Dimensions.get('window').width / 12,
        paddingLeft: 20,
        paddingRight: 40,
    },
    textInputWrapper: {
        marginTop: 10,
        position: 'relative',
        marginBottom: -10,
    },
    inner: {
        borderRadius: Dimensions.get('window').width / 16,
        lineHeight: Dimensions.get('window').width / 8,
        display: 'flex',
        borderWidth: 1,
        alignContent: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').width / 8,
        textAlign: 'center',
    },
    innerText: {
        backgroundColor: color.white,
        borderColor: color.mediumBlue,
        color: color.mediumBlue,
        fontSize: 20,
        lineHeight: Dimensions.get('window').width / 9,
    },
    cancel: {
        position: 'absolute',
        top: Dimensions.get('window').width / 25,
        right: Dimensions.get('window').width / 35,
    },
    cancelImage: {
        color: color.mediumBlue,
        width: Dimensions.get('window').width / 30,
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
        width: '100%',
    },
    conversion: {
        color: color.blue,
        width: '100%',
        marginTop: 15,
        textAlign: 'center',
    }
});
