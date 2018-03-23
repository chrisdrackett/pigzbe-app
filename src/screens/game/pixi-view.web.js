import React, {Component} from 'react';
import * as PIXI from 'pixi.js';
import startGame from './start-game';
import images from './images';
import sounds from './sounds';

export default class Game extends Component {
  state = {
      loading: true,
      resources: {}
  };

  constructor(props) {
      super(props);

      console.log('new Game');

      this.didBlurSubscription = this.props.navigation.addListener(
          'didBlur',
          payload => {
              console.debug('didBlur', payload);
              this.onBlur();
          }
      );
      this.didFocusSubscription = this.props.navigation.addListener(
          'didFocus',
          payload => {
              console.debug('didFocus', payload);
              this.onFocus();
          }
      );
      // this.didBlurSubscription.remove();
  }

  onBlur = () => {
      if (!this.app) {
          return;
      }
      this.app.onBlur();
  }

  onFocus = () => {
      if (!this.app) {
          return;
      }
      this.app.onFocus();
  }

  componentDidMount() {
      this.app = new PIXI.Application({
          backgroundColor: 0x0000ff,
          width: 800,
          height: 600,
          // antialias: true,
          // forceFXAA: true,
          transparent: true
      });
      this.el.appendChild(this.app.view);
      this.app.view.style.width = '100%';
      startGame(this.app, PIXI, images, sounds);
  }

  render() {

      return (
          <div ref={el => (this.el = el)} style={{flex: 1, width: '100%'}}/>
      );
  }
}
