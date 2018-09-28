import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    cloud: {
        left: 0,
        top: 0,
        position: 'absolute',
    },
    content: {
        borderWidth: 1,
        borderColor: '#f00',
    },
    type: {
        // position: 'absolute',
        // bottom: 10,
        // left: 0,
        // right: 0,
        textAlign: 'center',
        fontSize: 10,
        color: 'rgb(72, 70, 148)',
        fontWeight: 'bold',
    },
    value: {
        width: '100%',
        color: 'rgb(72, 70, 148)',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 28,
    },
    outer: {
        position: 'relative',
        width: 157,
        height: 66,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: '#0f0',
    },
});
