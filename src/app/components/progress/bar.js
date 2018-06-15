import React, {Component} from 'react';
import {View, Animated} from 'react-native';
import styles from './styles';

export default class Bar extends Component {
    state = {
        progress: new Animated.Value(23)
    }

    animate() {
        Animated.timing(this.state.progress, {
            toValue: 222,
            duration: 4000,
        }).start(this.loop);
    }

    loop = () => {
        this.setState({progress: new Animated.Value(23)});
        this.animate();
    }

    componentDidMount() {
        this.animate();
    }

    componentWillUnmount() {
        Animated.timing(this.state.progress).stop();
    }

    render() {
        const {progress} = this.state;
        const {error} = this.props;
        const style = error ? styles.barError : {width: progress};

        return (
            <View style={styles.bar}>
                <Animated.View
                    style={[styles.barInner, style]}
                />
            </View>
        );
    }
}
