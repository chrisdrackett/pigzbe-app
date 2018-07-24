import {StyleSheet} from 'react-native';

import {
    paddingH,
    color,
    fontFamily,
} from '../../styles';

export default StyleSheet.create({
    containerText: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        flexGrow: 1,
        paddingTop: 20,
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
    containerBody: {
        alignSelf: 'center',
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingBottom: 20
    },
});
