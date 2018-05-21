import React from 'react';
import {View} from 'react-native';
import Game from '../../../game/';
import NavListener from './nav-listener';
import Overlay from '../overlay';
import Loader from '../loader';
import {container} from '../../styles';

export default class GameView extends NavListener {
    state = {
        isLoading: true
    }

    componentDidMount() {
        super.componentDidMount();

        this.game = new Game(this.el);
        this.game.emitter.on('ready', () => {
            console.log('GAME READY');
            this.setState({isLoading: false});
        });
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
                <Overlay coins={1452}/>
                <Loader isLoading={this.state.isLoading} message={'Loading'}/>
            </View>
        );
    }
}
