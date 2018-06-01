import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.lightGrey,
        alignSelf: 'stretch',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20
    },
    containerCoins: {
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    label: {
        fontFamily,
        fontSize: 12,
        color: color.darkGrey
    }
});
