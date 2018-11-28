import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    header: {
        alignItems: 'center',
        marginTop: 20,
        height: 130,
    },
    bubbleWrapper: {
        marginBottom: 0,
    },
    bubble: {
        maxWidth: 300,
        width: 300,
        marginTop: 0,
    },
    bubbleButton: {
        position: 'absolute',
        top: 88,
        left: 0,
        width: '100%',
        alignItems: 'center',
    },
    bubbleButtonHit: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        width: 300,
        height: 80,
    },
});
