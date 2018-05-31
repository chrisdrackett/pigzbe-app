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
    buttonWrapper: {
        backgroundColor: color.lightGrey,
        height: 95,
        flexBasis: 95,
        flexGrow: 0,
        paddingLeft: paddingH,
        paddingRight: paddingH,
        paddingTop: 20,
        paddingBottom: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
});
