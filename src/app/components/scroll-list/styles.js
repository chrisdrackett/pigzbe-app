import {StyleSheet} from 'react-native';
import {border, color, fontFamily} from '../../styles';

export default StyleSheet.create({
    border,
    title: {
        fontFamily,
        fontSize: 16,
        color: color.darkGrey,
        marginTop: 20,
    },
    container: {
        backgroundColor: color.lightGrey,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        position: 'relative',
    },
    scrollView: {
        alignSelf: 'stretch',
    },
});
