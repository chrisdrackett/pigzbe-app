import {StyleSheet} from 'react-native';
import {color, fontFamily} from 'app/styles';

export default StyleSheet.create({
    toggleContainer: {
        backgroundColor: color.blue,
        paddingTop: 30,
        paddingBottom: 10,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
    },
    container: {
        backgroundColor: color.blue,
        flex: 1,
        padding: 30,
        paddingTop: 100,
        alignItems: 'center',
    },
    toggleButton: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        fontFamily,
        fontWeight: 'bold',
        color: color.white,
        fontSize: 16,
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 10,
        marginTop: 40,
    },
    chevron: {
        width: 11,
        height: 7,
        marginLeft: 10,
        transform: [{rotate: '180deg'}]
    },
    chevronUp: {
        transform: [{rotate: '0deg'}]
    },
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
    },
});
