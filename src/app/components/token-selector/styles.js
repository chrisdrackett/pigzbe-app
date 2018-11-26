import {StyleSheet} from 'react-native';
import {color, fontFamily} from 'app/styles';

export default StyleSheet.create({
    toggleContainer: {
        paddingTop: 3,
    },
    container: {
        backgroundColor: color.blue,
        flex: 1,
        padding: 30,
        paddingTop: 46,
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
    buttonIcon: {
        width: 23,
        height: 23,
        marginRight: 12,
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 10,
        marginTop: 40,
        marginBottom: 10,
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
