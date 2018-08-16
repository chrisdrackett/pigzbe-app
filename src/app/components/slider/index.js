import React from 'react';
import {Slider} from 'react-native';
import styles from './styles';

export default ({
    value = 0,
    onValueChange = () => {},
    onSlidingComplete = () => {},
    disabled = false,
    style,
}) => (
    <Slider
        value={value}
        thumbImage={require('./images/thumb.png')}
        trackImage={require('./images/track.png')}
        disabled={disabled}
        style={[styles.slider, style]}
        onChange={event => console.log(event)}
        onValueChange={onValueChange}
        onSlidingComplete={onSlidingComplete}
    />
);
