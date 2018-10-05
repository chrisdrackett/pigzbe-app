import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    outer: {
        position: 'relative',
        width: 157,
        height: 66,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    cloud: {
        left: 0,
        top: 0,
        position: 'absolute',
    },
    type: {
        textAlign: 'center',
        fontSize: 10,
        color: 'rgb(72, 70, 148)',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    value: {
        width: '100%',
        color: 'rgb(72, 70, 148)',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    raining: {
        position: 'absolute',
        top: -60,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    rain: {
        position: 'absolute',
        bottom: (Dimensions.get('window').height - 279) * -1,
        height: Dimensions.get('window').height - 278,
        width: 95,
        left: 27,
        backgroundColor: 'rgba(117, 235, 255, 50)',
    }
});
