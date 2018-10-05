import {StyleSheet} from 'react-native';

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
        bottom: -300,
        height: 300,
        width: 95,
        left: 31,
        backgroundColor: 'rgba(117, 235, 255, 50)',
    }
});
