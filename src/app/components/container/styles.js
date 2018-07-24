import {StyleSheet} from 'react-native';
import {color, paddingH} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.blue,
        flex: 1,
    },
    justifyCenter: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerBody: {
        alignItems: 'stretch',
        paddingLeft: paddingH,
        paddingRight: paddingH,
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    light: {
        backgroundColor: color.mediumBlue,
    },
    white: {
        marginTop: -10,
        backgroundColor: color.white,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        flex: 1,
    },
    scroll: {
        paddingLeft: paddingH,
        paddingRight: paddingH,
    }
});
