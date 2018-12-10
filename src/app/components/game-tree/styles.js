import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    tree: {
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
        // height: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 8,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    valueWrapper: {
        borderRadius: 15,
        width: 'auto',
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        alignSelf: 'center',
    },
    newValue: {
        backgroundColor: 'transparent',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#fff',
    },
    outer: {
        // backgroundColor: 'rgba(0, 0, 255, 0.4)',
        position: 'relative',
        justifyContent: 'center',
    },
});
