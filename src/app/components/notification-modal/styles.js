import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
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
    iconContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        width: 67,
        height: 67,
    },
    text: {
        fontSize: 12,
    },
    buttons: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        marginTop: 20,
        width: 'auto',
        paddingLeft: 15,
        paddingRight: 15,
    },
    buttonB: {
        marginLeft: 10,
    },
    buttonSmall: {
        marginTop: 5,
        marginBottom: 0,
    },
    buttonSmallText: {
        fontSize: 12,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        height: 36,
    },
    progress: {
        marginTop: 20,
        marginBottom: 20,
    },
});
