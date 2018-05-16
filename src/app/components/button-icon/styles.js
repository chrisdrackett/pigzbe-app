import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    backgroundColor: color.white,
    borderColor: color.yellow,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
  }
})
