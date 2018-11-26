import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.blue,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 20,
    },
    iconContainer: {
        width: 40,
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 12,
        marginRight: 12,
    },
    titleContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    customTitle: {
        color: color.lighterBlue,
        fontSize: 14,
    }
});
