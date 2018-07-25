import {StyleSheet} from 'react-native';

import {
    paddingH,
    color,
    fontFamily,
} from '../../styles';

export default StyleSheet.create({
    containerText: {
        alignItems: 'stretch',
        paddingLeft: paddingH,
        paddingRight: paddingH,
        paddingTop: 30,
        flex: 0,
    },
    containerBody: {
        alignSelf: 'stretch',
        flex: 1,
        justifyContent: 'flex-end'
    },
    subtitle: {
        fontFamily,
        color: color.blue,
        fontSize: 16,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 20,
        textAlign: 'center'
    },
    wrapper: {
        alignItems: 'center',
        flexGrow: 1,
        flex: 1,
        alignSelf: 'center'
    }
});
