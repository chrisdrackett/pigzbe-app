import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    title: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    subtitle: {
        fontFamily,
        color: color.whiteOpacity60,
        fontSize: 14,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    warning: {
        color: color.orange,
        fontWeight: 'bold',
    },
    confirmCopyOverlay: {
        backgroundColor: color.blueOpacity80,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmCopyContainer: {
        borderRadius: 10,
        backgroundColor: color.white,
        paddingTop: 22,
        paddingBottom: 6,
        paddingLeft: 14,
        paddingRight: 14,
        justifyContent: 'center',
        alignItems: 'center',
        width: 263,
    },
    checkbox: {
        position: 'relative',
        paddingLeft: 50,
    },
    checkboxCheck: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: color.blue,
        width: 30,
        height: 30,
        position: 'absolute',
        top: 6,
        left: 6,
    },
    checkboxActive: {
        backgroundColor: color.blue,
    },
    checkboxText: {
        marginLeft: 0,
        marginRight: 20,
        textAlign: 'left',
    }
});
