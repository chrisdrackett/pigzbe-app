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
        width: 10,
        height: 60,
        backgroundColor: 'rgb(106, 50, 16)',
        bottom: 0,
        left: '50%',
        marginLeft: -5,
        borderRadius: 5,
        opacity: 0.8,
    },
    leaf: {
        position: 'absolute',
        left: '50%',
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
});
