import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.blue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsIcon: {
        width: 18,
        height: 18
    },
    settings: {
        width: 38,
        height: 38,
        position: 'absolute',
        top: 24,
        right: 10,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10
    }
});
