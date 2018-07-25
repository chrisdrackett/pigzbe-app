import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import {color} from '../../styles';

export default class extends Component {
  state = {
      inputValue: '',
      activeBox: 0,
  }

  static defaultProps = {
      boxes: 4,
      padding: 0,
      style: null,
      secure: false,
      boxSize: {width: null, height: null}
  }

  render() {
      const {
          boxes,
          boxSize,
          onFulfill,
          padding,
          style,
          secure
      } = this.props;

      const width = boxSize.width || ~~(((Dimensions.get('window').width * 0.75) - padding) / boxes);

      return (
          <View>
              <CodeInput
                  activeColor={color.blue}
                  inactiveColor={color.mediumBlue}
                  autoFocus={false}
                  ignoreCase
                  secureTextEntry={secure}
                  inputPosition="center"
                  keyboardType="number-pad"
                  size={width}
                  space={4}
                  codeLength={boxes}
                  onFulfill={onFulfill}
                  containerStyle={[style, {
                      width: '90%',
                      alignSelf: 'center',
                  }]}
                  codeInputStyle={{borderRadius: 5, borderWidth: 1, height: boxSize.height || width * 1.45}}
              />
          </View>
      );
  }
}
