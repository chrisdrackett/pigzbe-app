import {StyleSheet} from 'react-native';

import {
    paddingH,
    color,
    fontFamily,
} from '../../styles';

export default StyleSheet.create({
    containerText: {
        alignItems: 'stretch',
        justifyContent: 'center',
        alignSelf: 'stretch',
        paddingLeft: paddingH,
        paddingRight: paddingH,
        flexGrow: 1,
        paddingTop: 20,
        flex: 1,
    },
    subtitle: {
        fontFamily,
        color: color.blue,
        fontSize: 14,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    wrapper: {
        alignItems: 'stretch',
        flexGrow: 1,
        flex: 1,
        alignSelf: 'center'
    }
});
