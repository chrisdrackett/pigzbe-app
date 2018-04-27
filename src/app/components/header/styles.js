import {StyleSheet} from 'react-native';
import {
    color
} from '../../styles';
export default StyleSheet.create({
    container: {
        backgroundColor: color.blue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    settingsIcon: {
        width: 18,
        height: 18
    },
    settings: {
        width: 18,
        height: 18,
        position: 'absolute',
        top: 34,
        right: 20
    }
});
