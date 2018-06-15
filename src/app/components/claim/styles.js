import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.blue,
        backgroundColor: 'magenta',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        alignSelf: 'stretch',
        backgroundColor: color.blue,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 69,
        flexBasis: 69,
        flexGrow: 0,
        position: 'relative',
        zIndex: 1,
    },
    containerLastStep: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    containerLoading: {
        width: 250,
        flex: 1
    },
    containerChildren: {
        alignSelf: 'stretch',
        alignItems: 'stretch',
    },
    alignLeft: {
        textAlign: 'left',
    },
    containerButtons: {
    },
    containerFields: {
    },
    containerBody: {
        alignItems: 'stretch',
        paddingLeft: paddingH,
        paddingRight: paddingH,
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
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
    tagline: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center',
        zIndex: 1,
        position: 'relative'
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
    list: {
    },
    listItem: {
        marginBottom: 20,
        paddingLeft: 30,
        position: 'relative',
    },
    text: {
        fontFamily,
        color: color.whiteOpacity60,
        fontSize: 14,
        textAlign: 'left'
    },
    num: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    error: {
        color: color.red,
        fontSize: 18
    },
    warning: {
        color: color.orange,
        fontWeight: 'bold',
    },
    modalConfirm: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    modalTitleCost: {
        marginBottom: 30,
    },
    buttonGreen: {
        width: 200,
        alignSelf: 'center',
        backgroundColor: color.green,
        marginBottom: 10,
    },
    buttonRed: {
        width: 200,
        alignSelf: 'center',
        backgroundColor: color.red
    },
    buttonStyle: {
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 10,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        margin: 0,
        marginTop: 20,
        maxWidth: 300,
        backgroundColor: color.blue,
    },
    buttonTitleStyle: {
        fontWeight: '600',
    },
    boxKeys: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: color.white,
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 18,
        paddingRight: 18,
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    boxKeysTitle: {
        fontFamily,
        color: color.white,
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'center',
        backgroundColor: color.blue,
        marginTop: -28,
        alignSelf: 'center',
        paddingLeft: 8,
        paddingRight: 8,
    },
    boxTx: {
        backgroundColor: color.green
    },
    boxKeysInner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    boxKeysText: {
        fontFamily,
        color: color.white,
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'left',
        width: 165,
    },
    boxKeysCopy: {
        width: 45,
        height: 45,
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
