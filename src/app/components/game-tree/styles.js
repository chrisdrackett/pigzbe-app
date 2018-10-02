import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    tree: {
        width: 200,
        height: 200,
        position: 'relative',
    },
    trunk: {
        position: 'absolute',
        width: 8,
        height: 57,
        bottom: 0,
        left: '50%',
        marginLeft: -4,
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
    },
    value: {
        height: 30,
        color: 'rgb(72, 70, 148)',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 28,
    },
    valueNew: {
        color: '#fff',
    },
    name: {
        height: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 8,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: 10,
    },
    valueWrapper: {
        borderRadius: 15,
        width: 'auto',
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        alignSelf: 'center'
    },
    newValue: {
        backgroundColor: 'transparent',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#fff',
    },
    outer: {
        position: 'relative',
        height: 250,
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
