import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    buttonWrapper: {
        width: 49,
        padding: 2,
    },
    buttonImage: {
        width: 45,
        height: 24,
    },
    buttonText: {
        fontFamily,
        color: color.white,
        fontSize: 8,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: 2,
        textAlign: 'center',
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
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 250,
    },
});
