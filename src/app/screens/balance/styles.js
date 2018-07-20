import {StyleSheet} from 'react-native';
import {
    container,
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: Object.assign({}, container, {flex: 0}),
    welcome: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10
    },
    pig: {
        marginTop: 20,
    },
});
