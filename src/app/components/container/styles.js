import {StyleSheet} from 'react-native';
import {color, paddingH} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.blue,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerBody: {
        alignItems: 'stretch',
        paddingLeft: paddingH,
        paddingRight: paddingH,
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
});
