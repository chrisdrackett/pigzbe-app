import React, {Component} from 'react';
import {View} from 'react-native';
import Game from './game';
import images from './images';

export default class PixiView extends Component {
    componentDidMount() {
        console.log('this.el', this.el);
        const {width, height} = this.el.getBoundingClientRect();
        this.game = new Game({
            width,
            height
            // antialias: true,
            // forceFXAA: true,
            // transparent: true
        }, images, this.props.navigation);

        this.el.appendChild(this.game.app.view);
        this.game.app.view.style.width = '100%';
    }

    render() {

        return (
            <View style={{flex: 1, width: '100%'}}>
                <div ref={el => (this.el = el)} style={{width: '100%', height: '100%'}}/>
            </View>
        );
    }
}
