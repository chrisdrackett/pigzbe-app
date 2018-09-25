import {StyleSheet} from 'react-native';
import {color, paddingH} from '../../styles';

export default StyleSheet.create({
    title: {
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 30,
        paddingLeft: paddingH,
        paddingRight: paddingH,
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    wrapperInner: {
        backgroundColor: color.black,
    },
    target: {
        position: 'absolute',
        width: 190,
        height: 189,
    },
});
