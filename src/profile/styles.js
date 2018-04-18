import {
    Platform,
    StyleSheet
} from 'react-native';

const input = {
    alignSelf: 'stretch',
    borderColor: '#000',
    borderWidth: 1,
    fontFamily: 'Poppins Regular',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10
};

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    },
    title: {
        fontFamily: 'Poppins Regular',
        color: Platform.OS === 'web' ? 'red' : 'black',
        fontSize: 50,
        marginBottom: 20
    },
    subscribe: {
        flex: 1,
        flexDirection: 'row'
    },
    subscribeText: {
        fontFamily: 'Poppins Regular',
        color: 'black',
        fontSize: 20,
        marginRight: 10
    },
    error: {
        color: 'red',
        fontSize: 18
    },
    input: {
        ...input
    },
    inputError: {
        ...input,
        borderColor: '#ff0000'
    },
    button: {
        alignSelf: 'stretch',
        color: 'blue',
        fontFamily: 'Poppins Regular',
        fontSize: 18,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        textAlign: 'center'
    }
});
