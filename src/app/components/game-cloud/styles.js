import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    outer: {
        position: 'relative',
        paddingTop: 50,
        width: 157,
    },
    touchable: {
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
        marginTop: 7,
    },
    value: {
        width: '100%',
        color: 'rgb(72, 70, 148)',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    content: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
    raining: {
        bottom: 70,
    },
    rain: {
        position: 'absolute',
        width: 95,
        left: 27,
        backgroundColor: 'rgb(117, 235, 255)',
        opacity: 0.5,
    }
});
