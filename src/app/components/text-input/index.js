import React, {Fragment} from 'react';
import {TextInput, Text, View} from 'react-native';
import styles from './styles';
import {color} from '../../styles';

const getHeight = (numberOfLines, margin = 0) => ({
    height: 24 + 21 * numberOfLines + margin
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
        paddingTop: numberOfLines > 1 ? 11 : 2
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
    autoCapitalize = 'sentences',
    autoCorrect = true,
    returnKeyType = 'done',
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
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
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
