import React, {Component} from 'react';
import {Dimensions, TextInput, View} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import styles from './styles';

export default class extends Component {
  state = {
      inputValue: '',
      activeBox: 0,
  }

  static defaultProps = {
      boxes: 4,
      onFulfill: () => {}
  }

  onFulfill = (e) => {
      console.log(e);
      this.props.onFulfill(e);
  }

  render() {
      const {boxes} = this.props;
      const width = (Dimensions.get('window').width - 50) / boxes;

      return (
          <View style={styles.container}>
              <CodeInput
                  autoFocus
                  codeInputStyle={styles.codeInputStyle}
                  codeLength={boxes}
                  keyboardType="number-pad"
                  size={width}
                  inputPosition="left"
                  onFulfill={this.onFulfill}
              />
          </View>
      );
  }
}
