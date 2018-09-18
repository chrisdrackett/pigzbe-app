import {StyleSheet, Dimensions} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    buttonStyle: {
        borderColor: color.blue,
        width: Dimensions.get('window').width * 0.15,
        height: 0,
        paddingBottom: Dimensions.get('window').width * 0.15,
        marginBottom: Dimensions.get('window').width * 0.15,
        position: 'relative',
    },
    innerStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        marginBottom: 0,
        borderRadius: Dimensions.get('window').width * 0.075,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').width * 0.15,
    },
    flexStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
