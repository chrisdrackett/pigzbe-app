import React, {Fragment} from 'react';
import {TextInput, Text, View} from 'react-native';
import styles from './styles';
import {color} from '../../styles';

const getStyle = (error, dark, numberOfLines, extra) => {
    let style = [styles.input];

    if (dark) {
        style = style.concat(styles.dark);
    }

    if (error) {
        style = style.concat(styles.error);
    }

    if (numberOfLines > 1) {
        style = style.concat({
            height: 45 + 12 * (numberOfLines - 1)
        });
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
    editable = true,
    keyboardType = 'default'
}) => (
    <Fragment>
        {label ? (
            <Text style={dark ? [styles.label, styles.labelDark] : styles.label}>
                {label}
            </Text>
        ) : null}
        <View style={styles.wrapper}>
            <TextInput
                style={getStyle(error, dark, numberOfLines, style)}
                placeholder={placeholder}
                placeholderTextColor={dark ? color.grey : color.whiteOpacity60}
                onChangeText={inputText => onChangeText(inputText)}
                value={value}
                numberOfLines={numberOfLines}
                multiline={numberOfLines > 1}
                maxLength={maxLength}
                editable={editable}
                keyboardType={keyboardType}
            />
        </View>
    </Fragment>
);
