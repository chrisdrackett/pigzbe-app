import React, {Component} from 'react';
import * as PIXI from 'pixi.js';
import startGame from './start-game';
import images from './images';

export default class Game extends Component {
  state = {
      loading: true,
      resources: {}
  };

  componentDidMount() {
      const app = new PIXI.Application({
          backgroundColor: 0x0000ff,
          width: 800,
          height: 600,
          // antialias: true,
          // forceFXAA: true,
          transparent: true
      });
      this.el.appendChild(app.view);
      app.view.style.width = '100%';
      startGame(app, PIXI, images);
  }

  render() {

      return (
          <div ref={el => (this.el = el)} style={{flex: 1, width: '100%'}}/>
      );
  }
}
