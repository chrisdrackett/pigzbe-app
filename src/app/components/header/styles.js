import {StyleSheet} from 'react-native';
import {color} from '../../styles';

// const btnSize = 40;

// const getPadding = (w, h) => ({
//     paddingTop: (btnSize - h) / 2,
//     paddingRight: (btnSize - w) / 2,
//     paddingBottom: (btnSize - h) / 2,
//     paddingLeft: (btnSize - w) / 2,
// });

export default StyleSheet.create({
    container: {
        backgroundColor: color.blue,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 20,
    },
    iconContainer: {
        width: 40,
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 18,
        marginRight: 18,
    },
    titleContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // settingsIcon: {
    //     width: 18,
    //     height: 18
    // },
    // settings: {
    //     width: btnSize,
    //     height: btnSize,
    //     ...getPadding(18, 18)
    // },
    // back: {
    //     // backgroundColor: 'red',
    //     width: btnSize,
    //     height: btnSize,
    //     ...getPadding(14, 11)
    // },
    // backIcon: {
    //     width: 14,
    //     height: 11,
    // },
    customTitle: {
        color: color.lighterBlue,
        fontSize: 14,
    }
});
