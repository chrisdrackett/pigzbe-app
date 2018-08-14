import React from 'react';
import {Slider} from 'react-native';
import styles from './styles';

export default ({
    onValueChange = () => {},
    onSlidingComplete = () => {},
    disabled = false,
    style,
}) => (
    <Slider
        thumbImage={require('./images/thumb.png')}
        trackImage={require('./images/track.png')}
        disabled={disabled}
        style={[styles.slider, style]}
        onValueChange={onValueChange}
        onSlidingComplete={onSlidingComplete}
    />
);
