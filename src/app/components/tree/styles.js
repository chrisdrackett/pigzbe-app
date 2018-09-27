import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    tree: {
        width: 200,
        height: 200,
        position: 'relative',
        borderColor: '#0f0',
        borderWidth: 1,
    },
    trunk: {
        position: 'absolute',
        width: 8,
        height: 57,
        // backgroundColor: 'rgb(106, 50, 16)',
        bottom: 0,
        left: '50%',
        marginLeft: -4,
        // borderRadius: 5,
        opacity: 0.8,
    },
    leaf: {
        position: 'absolute',
        left: '50%',
    },
    sprout: {
        position: 'absolute',
        width: 28,
        height: 31,
        bottom: 40,
        left: '50%',
        marginLeft: -14,
    },
    leaves: {
        position: 'absolute',
        width: 200,
        height: 150,
        top: 0,
        right: 0,
        left: 0,
        borderColor: '#000',
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
    valueWrapper: {
        borderRadius: 15,
        width: 42,
        height: 30,
        position: 'absolute',
        left: '50%',
        bottom: 0,
        marginLeft: -21,
        backgroundColor: '#fff',
    },
    outer: {
        position: 'relative',
        height: 250,
        borderColor: '#000',
        borderWidth: 1,
    }
});
