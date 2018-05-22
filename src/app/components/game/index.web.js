import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Game from '../../../game/';
import NavListener from './nav-listener';
import Overlay from '../overlay';
import Loader from '../loader';
import {container} from '../../styles';
import {gameWolloCollected, gameOverlayOpen} from '../../actions';

class GameView extends NavListener {
    state = {
        isLoading: true
    }

    componentDidMount() {
        super.componentDidMount();

        this.game = new Game(this.el);

        this.game.app.emitter.on('ready', () => {
            console.log('GAME READY');
            this.setState({isLoading: false});
        });
        this.game.app.emitter.on('collected', amount => {
            console.log('collected', amount);
            this.props.dispatch(gameWolloCollected(amount));
        });
        this.game.app.emitter.on('learn', () => {
            console.log('learn');
            this.props.dispatch(gameOverlayOpen(true));
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
                <Overlay/>
                <Loader isLoading={this.state.isLoading} message={'Loading'}/>
            </View>
        );
    }
}

export default connect()(GameView);
