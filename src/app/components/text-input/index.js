import React from 'react';
import {TextInput} from 'react-native';
import styles from './styles';
import {color} from '../../styles';

export default ({
    placeholder,
    onChangeText,
    error = false,
    value = ''
}) => (
    <TextInput
        style={error ? [styles.input, styles.error] : styles.input}
        placeholder={placeholder}
        placeholderTextColor={color.whiteOnBlueOpacity60}
        onChangeText={inputText => onChangeText(inputText)}
        value={value}
    />
);
