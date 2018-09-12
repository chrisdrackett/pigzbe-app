import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    wordHolder: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    word: {
        backgroundColor: color.blue,
        paddingTop: 5,
        paddingRight: 7,
        paddingBottom: 5,
        paddingLeft: 7,
        borderRadius: 4,
        margin: 4,
    },
    wordText: {
        fontFamily,
        color: color.white,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    word__selected: {
        backgroundColor: color.pink,
    },
    wordText__selected: {
        color: color.blue,
    },
});
