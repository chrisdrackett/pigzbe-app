import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import styles from './styles';
import SpritePlayer from '../../utils/sprite-player';

const bird = [
    require('./images/bird_00000.png'),
    require('./images/bird_00001.png'),
    require('./images/bird_00002.png'),
    require('./images/bird_00003.png'),
    require('./images/bird_00004.png'),
    require('./images/bird_00005.png'),
    require('./images/bird_00006.png'),
    require('./images/bird_00007.png'),
    require('./images/bird_00008.png'),
    require('./images/bird_00009.png'),
    require('./images/bird_00010.png'),
    require('./images/bird_00011.png'),
    require('./images/bird_00012.png'),
    require('./images/bird_00013.png'),
    require('./images/bird_00014.png'),
    require('./images/bird_00015.png'),
    require('./images/bird_00016.png'),
    require('./images/bird_00017.png'),
    require('./images/bird_00018.png'),
    require('./images/bird_00019.png'),
    require('./images/bird_00020.png'),
];

const startX = Dimensions.get('window').width + 100;
const startY = 100;

export default class Bg extends Component {
    state = {
        x: startX,
        y: startY,
    }

    componentDidMount() {
        this.update();
    }

    update = () => {
        let x = this.state.x - 2;
        let y = this.state.y;

        if (x < -100) {
            x = startX + Math.floor(Math.random() * 500);
            y = startY + -50 + Math.random() * 100;
        }

        this.setState({x, y});

        requestAnimationFrame(this.update);
    }

    render() {
        return (
            <SpritePlayer
                frames={bird}
                style={[styles.bird, {
                    left: this.state.x,
                    top: this.state.y
                }]}
            />
        );
    }
}
