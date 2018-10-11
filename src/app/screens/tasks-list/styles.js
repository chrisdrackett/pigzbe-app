import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    innerStyle: {
        borderRadius: 5,
        alignContent: 'center',
        justifyContent: 'center',
        height: 45,
    },
    cancelStyle: {
        marginLeft: 'auto',
        marginRight: 'auto',
        borderBottomWidth: 1,
        borderBottomColor: color.blue,
    },
    cancelInner: {
        color: color.blue,
        fontSize: 14,
    },
    flexStyle: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
    },
});
