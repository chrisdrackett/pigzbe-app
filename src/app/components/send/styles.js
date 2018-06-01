import {StyleSheet} from 'react-native';
import {
    container,
    color,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    container,
    pig: {
        marginTop: 20,
    },
    containerBody: {
        backgroundColor: color.lightGrey,
        width: '100%',
        paddingLeft: paddingH,
        paddingRight: paddingH,
        flex: 1,
        justifyContent: 'center'
    },
});
