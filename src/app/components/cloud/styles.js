import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    cloud: {
        left: 0,
        top: 0,
        position: 'absolute',
    },
    type: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    value: {
        width: 42,
        height: 30,
        color: 'rgb(72, 70, 148)',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 28,
    },
    outer: {
        position: 'relative',
        width: 400,
        height: 250,
    },
});
