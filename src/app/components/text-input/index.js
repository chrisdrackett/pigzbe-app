import React, {Fragment} from 'react';
import {TextInput, Text, View} from 'react-native';
import styles from './styles';
import {color} from '../../styles';

const getHeight = (numberOfLines, margin = 0) => ({
    height: Math.floor(30 + 15 * numberOfLines + margin)
});

const getStyle = (error, dark, numberOfLines, extra) => {
    let style = [styles.input];

    if (dark) {
        style = style.concat(styles.dark);
    }

    if (error) {
        style = style.concat(styles.error);
    }

    style = style.concat(getHeight(numberOfLines));

    style = style.concat({
        paddingTop: numberOfLines > 1 ? 15 : 12
    });

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
    keyboardType = 'default',
    returnKeyType = 'default',
}) => (
    <Fragment>
        {label ? (
            <Text style={dark ? [styles.label, styles.labelDark] : styles.label}>
                {label}
            </Text>
        ) : null}
        <View style={getHeight(numberOfLines, 10)}>
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
                returnKeyType={returnKeyType}
                blurOnSubmit={true}
            />
        </View>
    </Fragment>
);
