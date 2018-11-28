import React, {Component} from 'react';
import {Image} from 'react-native';

export default class SpritePlayer extends Component {
    lastTime = 0
    elapsed = 0
    raf = null

    state = {
        currentFrame: 0,
    }

    static defaultProps = {
        fps: 20
    }

    componentDidMount() {
        this.update();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.raf);
    }

    update = (time = 0) => {
        if (!this.lastTime) {
            this.lastTime = time;
        }

        const dt = time - this.lastTime;
        this.lastTime = time;
        this.elapsed += dt;

        if (this.elapsed >= 1000 / this.props.fps) {
            this.elapsed = 0;

            let currentFrame = this.state.currentFrame + 1;

            if (currentFrame === this.props.frames.length) {
                currentFrame = 0;
            }

            this.setState({currentFrame});
        }

        this.raf = requestAnimationFrame(this.update);
    }

    render() {
        return (
            <Image
                style={this.props.style}
                source={this.props.frames[this.state.currentFrame]}
            />
        );
    }
}
