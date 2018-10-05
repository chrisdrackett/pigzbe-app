import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
        marginTop: 5,
    },
    value: {
        width: '100%',
        color: 'rgb(72, 70, 148)',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 28,
    },
    raining: {
        position: 'relative',
        marginTop: -60,
    },
    outer: {
        position: 'relative',
        width: 157,
        height: 66,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
});
