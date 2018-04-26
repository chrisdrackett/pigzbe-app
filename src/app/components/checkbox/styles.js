import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    outer: {
      width: 30,
      height: 30,
      borderWidth: 1,
      borderColor: color.white,
      borderStyle: 'solid',
      borderRadius: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    innerInactive: {
      width: 16,
      height: 16,
      backgroundColor: color.white,
      opacity: .3,
      borderRadius: '100%'
    },

    innerActive: {
      width: 16,
      height: 16,
      backgroundColor: color.white,
      opacity: 1,
      borderRadius: '100%'
    }
});
