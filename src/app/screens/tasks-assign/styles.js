import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    textStyle: {
        color: color.blue,
        fontSize: 16,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 30,
        marginTop: 20,
        textAlign: 'center',
    },
    sendButton: {
        marginTop: 20,
    },
    flexStyle: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
    },
});
