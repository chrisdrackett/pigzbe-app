import React, {Fragment} from 'react';
import {TextInput, Text} from 'react-native';
import styles from './styles';
import {color} from '../../styles';

const getStyle = (error, dark, extra) => {
    let style = [styles.input];

    if (dark) {
        style = style.concat(styles.dark);
    }

    if (error) {
        style = style.concat(styles.error);
    }

    if (extra) {
        style = style.concat(extra);
    }

    return style;
};

export default ({
    placeholder,
    onChangeText,
    error = false,
    value = '',
    label,
    dark,
    numberOfLines = 1,
    maxLength,
    style,
    editable = true
}) => (
    <Fragment>
        {label ? (
            <Text style={dark ? [styles.label, styles.labelDark] : styles.label}>
                {label}
            </Text>
        ) : null}
        <TextInput
            style={getStyle(error, dark, style)}
            placeholder={placeholder}
            placeholderTextColor={dark ? color.grey : color.whiteOpacity60}
            onChangeText={inputText => onChangeText(inputText)}
            value={value}
            numberOfLines={numberOfLines}
            multiline={numberOfLines > 1}
            maxLength={maxLength}
            editable={editable}
        />
    </Fragment>
);
