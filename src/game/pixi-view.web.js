import React, {Component} from 'react';
import {View} from 'react-native';
import Game from './game';
import images from './images';
import * as PIXI from 'pixi.js';

export default class PixiView extends Component {
    componentDidMount() {
        const {width, height} = this.el.getBoundingClientRect();

        this.game = new Game({
            width,
            height
            // antialias: true,
            // forceFXAA: true,
            // transparent: true
        }, images, this.props.navigation);

        const {app} = this.game;

        this.el.appendChild(app.view);
        app.view.style.width = '100%';
        app.view.style.height = '100%';
        app.view.style.cursor = 'pointer';

        app.stage.interactive = true;
        app.stage.hitArea = new PIXI.Rectangle(0, 0, width, height);
        app.stage.on('pointerdown', event => {
            app.view.style.cursor = 'all-scroll';
            this.game.touchDown(event.data.global);
        });
        app.stage.on('pointermove', event => this.game.touchMove(event.data.global));
        app.stage.on('pointerup', event => {
            app.view.style.cursor = 'pointer';
            this.game.touchUp(event.data.global);
        });

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const {width, height} = this.el.getBoundingClientRect();
        this.game.resize({x: 0, y: 0, width, height});
        this.game.app.stage.hitArea.width = width;
        this.game.app.stage.hitArea.height = height;
    }

    render() {

        return (
            <View style={{flex: 1, width: '100%'}}>
                <div ref={el => (this.el = el)} style={{width: '100%', height: '100%'}}/>
            </View>
        );
    }
}
