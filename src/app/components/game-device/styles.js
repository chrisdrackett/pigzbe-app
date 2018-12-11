import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    wrapper: {
        // width: 49,
        // height: 28,
        padding: 2,
    },
    image: {
        width: 45,
        height: 24,
    },
    text: {
        color: color.white,
        fontSize: 8,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    overlay: {
        backgroundColor: color.blueOpacity80,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerContainer: {
        paddingTop: 33,
        paddingBottom: 33,
    },
    container: {
        marginLeft: 32,
        marginRight: 32,
        backgroundColor: color.white,
        paddingTop: 43,
        paddingLeft: 22,
        paddingRight: 22,
        paddingBottom: 20,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        width: 250,
        minHeight: 200,
    },
});
