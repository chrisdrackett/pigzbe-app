import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Game from '../../../game/';
import Learn from '../learn';
import Loader from '../../components/loader';
import {container} from '../../styles';
import {gameWolloCollected, gameOverlayOpen} from '../../actions';
import {strings} from '../../constants';
import {
    READY,
    COLLECTED,
    LEARN
} from '../../../game/constants';

class GameView extends Component {
    state = {
        loading: true
    }

    componentDidMount() {
        super.componentDidMount();

        this.game = new Game(this.el);

        this.game.app.emitter.on(READY, () => {
            console.log('GAME READY');
            this.setState({loading: false});
        });
        this.game.app.emitter.on(COLLECTED, amount => {
            console.log('collected', amount);
            this.props.dispatch(gameWolloCollected(amount));
        });
        this.game.app.emitter.on(LEARN, () => {
            console.log('learn');
            this.props.dispatch(gameOverlayOpen(true));
        });
    }

    onBlur = () => {
        if (!this.game) {
            return;
        }
        this.game.pause();
    }

    onFocus = () => {
        if (!this.game) {
            return;
        }
        this.game.resume();
    }

    render() {
        const {dispatch, exchange, wolloCollected, overlayOpen} = this.props;

        return (
            <View style={container}>
                <div
                    ref={el => (this.el = el)}
                    style={container}
                />
                <Learn
                    dispatch={dispatch}
                    exchange={exchange}
                    wolloCollected={wolloCollected}
                    overlayOpen={overlayOpen}
                />
                <Loader
                    loading={this.state.loading}
                    message={strings.gameLoading}
                />
            </View>
        );
    }
}

export default connect(state => ({
    exchange: state.coins.exchange,
    wolloCollected: state.game.wolloCollected,
    overlayOpen: state.game.overlayOpen
}))(GameView);
