import React, {Component, Fragment} from 'react';
import {View, Image, Dimensions, PanResponder} from 'react-native';
import styles, {MAP_WIDTH} from './styles';
import Birds from '../game-birds';

const cameraW = Dimensions.get('window').width;
const startX = (cameraW - MAP_WIDTH) / 2;

const Front = ({left}) => (<View style={[styles.scrollable, {
    left
}]}>
    <Image style={styles.ground} resizeMode="repeat" source={require('./images/ground.png')} />
    <Image style={styles.foliage} source={require('./images/foliage.png')} />
    <Image style={[styles.grass, styles.grassLeft]} source={require('./images/grass.png')} />
    <Image style={[styles.grass, styles.grassRight]} source={require('./images/grass.png')} />
</View>);

const Back = ({left}) => (<View style={[styles.scrollable, {
    left
}]}>
    <Image style={[styles.mountains, styles.mountainsLeft]} source={require('./images/mountains.png')} />
    <Image style={[styles.mountains, styles.mountainsRight]} source={require('./images/mountains.png')} />
</View>);

class Scrollable extends Component {
    state = {
        aX: startX,
        bX: MAP_WIDTH + startX,
        cameraX: 0
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

        this.setState({cameraX, aX, bX});
    }

    render() {
        const {Layer} = this.props;
        return (<Fragment>
            <Layer left={this.state.aX} />
            <Layer left={this.state.bX} />
        </Fragment>);
    }
}

export default class Bg extends Component {
    state = {
        x: 0,
        offset: 0,
        delta: 0,
        birdX: 0,
        animating: false,
    }

    static defaultProps = {
        targetX: 0,
        onMove: () => {},
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: this.handleGestureCapture,
            onPanResponderMove: this.handleGestureMove,
            onPanResponderRelease: this.handleGestureRelease,
            onPanResponderTerminationRequest: this.handleGestureTerminationRequest
        });
    }

    handleGestureTerminationRequest = (e, s) => {
        console.log('handleGestureTerminationRequest');
        // this.props.shouldRelease(s);
    }

    handleGestureCapture = (e, s) => {
        // console.log('handleGestureCapture');
        // this.props.shouldCapture(s);
        // return evt.nativeEvent.touches.length === 1 && !this._gestureIsClick(gestureState);
        return e.nativeEvent.touches.length === 1;
    }

    _gestureIsClick(gestureState) {
        return Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5;
    }

    handleGestureMove = (e, {dx}) => {
        console.log('handleGestureMove', dx);
        const moveDelta = this.state.offset - dx;

        let x = this.state.x + moveDelta;

        if (x < 0) {
            x = 0;
        }
        if (x > this.props.maxX) {
            x = this.props.maxX;
        }

        const delta = x - this.state.x;

        this.setState({
            x,
            delta,
            offset: dx,
            animating: false,
        });
    };

    handleGestureRelease = (e, {dx, vx}) => {
        console.log('handleGestureRelease', dx, vx);
        this.setState({offset: 0, animating: true});
        this.props.onMoveComplete(this.state.x);
    }

    componentDidMount() {
        this.update();
    }

    update = () => {
        if (this.state.animating) {
            const {targetX} = this.props;
            if (targetX !== this.state.x) {
                let x = this.state.x + (targetX - this.state.x) * 0.1;
                let delta = x - this.state.x;

                if (Math.abs(delta) < 0.01) {
                    x = targetX;
                    delta = 0;
                }

                if (x !== this.state.x) {
                    this.setState({x, delta});
                }
            }
        }

        requestAnimationFrame(this.update);
    }

    render() {
        return (<View style={styles.wrapper}>
            <View style={styles.sky} />
            <View style={styles.sunWrapper}>
                <Image style={styles.sun} source={require('./images/sun.png')} />
            </View>
            <Scrollable Layer={Back} speed={this.state.delta / 2} />
            <Scrollable Layer={Front} speed={this.state.delta} />
            <View {...this.panResponder.panHandlers} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                // backgroundColor: 'red',
            }} />
            <View style={[
                styles.children, {
                    left: 0 - this.state.x
                }
            ]}>
                {/* <Text style={{position: 'absolute', top: 60, left: 20}}>
                        {this.state.x}
                    </Text> */
                }
                {this.props.children}
            </View>
            <Birds offset={this.state.delta / 2} />
        </View>);
    }
}
