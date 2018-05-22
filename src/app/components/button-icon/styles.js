import {StyleSheet} from 'react-native';

import {
    color
} from '../../styles';

export default StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        backgroundColor: color.lightPurple,
        borderColor: color.lightPurple,
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selected: {
        backgroundColor: color.white,
        borderColor: color.purple,
    },
    image: {
        width: 60,
        height: 60,
    }
});
