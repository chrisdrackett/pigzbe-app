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
        width: 26,
        height: 26,
        position: 'absolute',
        top: 30,
        right: 16,
        paddingTop: 4,
        paddingLeft: 4,
    }
});
