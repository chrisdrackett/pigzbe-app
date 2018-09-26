import React, {Component, Fragment} from 'react';
import {View, Image, Dimensions} from 'react-native';
import styles, {MAP_WIDTH} from './styles';

const cameraW = Dimensions.get('window').width;
const startX = (cameraW - MAP_WIDTH) / 2;

const Front = ({left}) => (
    <View style={[styles.scrollable, {left}]}>
        <Image
            style={styles.ground}
            resizeMode="repeat"
            source={require('./images/ground.png')}
        />
        <Image
            style={styles.foliage}
            source={require('./images/foliage.png')}
        />
        <Image
            style={[styles.grass, styles.grassLeft]}
            source={require('./images/grass.png')}
        />
        <Image
            style={[styles.grass, styles.grassRight]}
            source={require('./images/grass.png')}
        />
    </View>
);

const Back = ({left}) => (
    <View style={[styles.scrollable, {left}]}>
        <Image
            style={[styles.mountains, styles.mountainsLeft]}
            source={require('./images/mountains.png')}
        />
        <Image
            style={[styles.mountains, styles.mountainsRight]}
            source={require('./images/mountains.png')}
        />
    </View>
);

class Scrollable extends Component {
    state = {
        aX: startX,
        bX: MAP_WIDTH + startX,
        cameraX: 0,
    }

    componentDidUpdate(prevProps) {
        if (prevProps.speed !== this.props.speed) {
            this.update();
        }
    }

    update = () => {
        const {speed} = this.props;
        const cameraX = this.state.cameraX + speed;

        let aX = this.state.aX - speed;
        let bX = this.state.bX - speed;

        if (aX > cameraX && bX > cameraX) {
            if (aX > bX) {
                aX = bX - MAP_WIDTH;
            } else {
                bX = aX - MAP_WIDTH;
            }
        }

        if (aX + MAP_WIDTH < cameraW && bX + MAP_WIDTH < cameraW) {
            if (aX > bX) {
                bX = aX + MAP_WIDTH;
            } else {
                aX = bX + MAP_WIDTH;
            }
        }

        this.setState({
            cameraX,
            aX,
            bX,
        });
    }

    render() {
        const {Layer} = this.props;
        return (
            <Fragment>
                <Layer
                    left={this.state.aX}
                />
                <Layer
                    left={this.state.bX}
                />
            </Fragment>
        );
    }
}

export default class Bg extends Component {
    state = {
        x: 0,
        delta: 0,
    }

    static defaultProps = {
        targetX: 0
    }

    componentDidMount() {
        this.update();
    }

    update = () => {
        let x = this.state.x + (this.props.targetX - this.state.x) * 0.01;
        let delta = x - this.state.x;

        if (delta < 1) {
            x = this.props.targetX;
            delta = 0;
        }

        if (delta) {
            this.setState({
                x,
                delta,
            });
        }

        requestAnimationFrame(this.update);
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.sky} />
                <View style={styles.sunWrapper}>
                    <Image style={styles.sun} source={require('./images/sun.png')} />
                </View>
                <Scrollable
                    Layer={Back}
                    speed={this.state.delta / 2}
                />
                <Scrollable
                    Layer={Front}
                    speed={this.state.delta}
                />
            </View>
        );
    }
}
