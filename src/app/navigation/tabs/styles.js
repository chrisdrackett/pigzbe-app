import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flex: 1
    },
    notify: {
        position: 'absolute',
        right: -5,
        top: -5,
        width: 10,
        height: 10
    },
    border: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        height: 5,
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        zIndex: 1
    }
});
