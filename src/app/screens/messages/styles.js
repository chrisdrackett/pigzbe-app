import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    message: {
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: color.mediumGrey
    },
    date: {
        fontFamily,
        color: color.blue,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5
    },
    text: {
        fontFamily,
        color: color.darkGrey,
        fontSize: 14,
        marginRight: 12,
    },
    chevron: {
        position: 'absolute',
        right: 0,
        top: 30,
    },
});
