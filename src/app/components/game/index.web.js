import React from 'react';
import {View} from 'react-native';
import Game from '../../../game/';
import NavListener from './nav-listener';
import Overlay from '../overlay';
import {container} from '../../styles';

export default class GameView extends NavListener {
    componentDidMount() {
        super.componentDidMount();

        this.game = new Game(this.el);
    }

    onBlur() {
        if (!this.game) {
            return;
        }
        this.game.pause();
    }

    onFocus() {
        if (!this.game) {
            return;
        }
        this.game.resume();
    }

    render() {
        return (
            <View style={container}>
                <div
                    ref={el => (this.el = el)}
                    style={container}
                />
                <Overlay/>
            </View>
        );
    }
}
