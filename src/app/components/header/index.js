import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Logo from '../logo';
import {SCREEN_PROFILE} from '../../constants';
import styles from './styles';

export default class extends Component {
  onPress = () => {
      this.props.navigation.navigate(SCREEN_PROFILE);
  }

  render() {
      const {showSettings} = this.props;

      return (
          <View style={styles.container}>
              <Logo />
              {showSettings &&
                  <TouchableOpacity style={styles.settings} onPress={this.onPress}>
                      <Image style={styles.settingsIcon} source={require('./images/settings-icon.png')} />
                  </TouchableOpacity>
              }
          </View>
      );
  }
}
