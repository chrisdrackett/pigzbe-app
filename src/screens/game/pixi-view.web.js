import React, {Component} from 'react';
import startGame from './start-game';
import images from './images';
import sounds from './sounds';
import {View} from 'react-native';

export default class Game extends Component {
  state = {
      loading: true,
      resources: {}
  };

  constructor(props) {
      super(props);

      console.log('new Game');
  }

  componentDidMount() {
      const {width, height} = this.el.getBoundingClientRect();
      this.app = startGame({
          width,
          height
          // antialias: true,
          // forceFXAA: true,
          // transparent: true
      }, images, sounds, this.props.navigation);

      this.el.appendChild(this.app.view);
      this.app.view.style.width = '100%';
  }

  render() {

      return (
          <View style={{flex: 1, width: '100%'}}>
              <div ref={el => (this.el = el)} style={{width: '100%', height: '100%'}}/>
          </View>
      );
  }
}
