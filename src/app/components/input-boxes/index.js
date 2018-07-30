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
      space: 4,
      style: null,
      secure: false,
      boxSize: {width: null, height: null}
  }

  render() {
      const {
          boxes,
          boxSize,
          space,
          onFulfill,
          secure
      } = this.props;

      return (
          <View style={{height: boxSize.height}}>
              <CodeInput
                  activeColor={color.blue}
                  inactiveColor={color.mediumBlue}
                  autoFocus={false}
                  ignoreCase
                  secureTextEntry={secure}
                  inputPosition="center"
                  keyboardType="number-pad"
                  size={boxSize.width}
                  space={space}
                  codeLength={boxes}
                  onFulfill={onFulfill}
                  // containerStyle={[style, {
                  //     width: '90%',
                  //     alignSelf: 'center',
                  // }]}
                  containerStyle={{marginTop: 0}}
                  codeInputStyle={{borderRadius: 5, borderWidth: 1, width: boxSize.width, height: boxSize.height}}
              />
          </View>
      );
  }
}
