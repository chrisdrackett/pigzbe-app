import {StyleSheet} from 'react-native';
import {
    border,
    color,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    wrapper: {
        position: 'relative',
        width: '100%',
    },
    border: {
        ...border,
        top: -5,
    },
    container: {
        backgroundColor: color.white,
        height: 84,
        flexBasis: 84,
        flexGrow: 0,
        paddingLeft: paddingH,
        paddingRight: paddingH,
        paddingTop: 19,
        paddingBottom: 20,
        alignSelf: 'stretch',
    },
});
