import {StyleSheet, Dimensions} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    imageStyle: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.3,
        borderRadius: Dimensions.get('window').width * 0.15,
        borderColor: color.lighterBlue,
        borderWidth: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20,
    },
    subTitle: {
        color: color.blue,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    smallText: {
        color: color.blue,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
    }
});
