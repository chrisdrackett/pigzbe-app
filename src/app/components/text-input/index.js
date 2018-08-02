import React, {Fragment} from 'react';
import {TextInput, Text, View} from 'react-native';
import styles from './styles';
import {color} from '../../styles';
import isAndroid from '../../utils/is-android';

const padding = isAndroid ? 11 : 0;
const paddingMulti = isAndroid ? 11 : 8;

const getHeight = (numberOfLines, margin = 0) => 24 + 21 * numberOfLines + margin;

const getStyle = (error, numberOfLines, style) => {
    let s = [styles.input, {
        borderRadius: numberOfLines > 1 ? 5 : 22.5,
        height: getHeight(numberOfLines),
        paddingTop: numberOfLines > 1 ? paddingMulti : padding,
        // paddingTop: numberOfLines > 1 ? 11 : 2,
    }];

    if (error) {
        s = s.concat(styles.error);
    }

    if (style) {
        s = s.concat(style);
    }

    return s;
};

export default ({
    placeholder,
    onChangeText,
    error = false,
    value = '',
    label,
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
        {label && (
            <Text style={styles.label}>
                {label}
            </Text>
        )}
        <View style={{alignSelf: 'stretch', height: getHeight(numberOfLines, 10)}}>
            <TextInput
                style={getStyle(error, numberOfLines, style)}
                placeholder={placeholder}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                placeholderTextColor={color.lighterBlue}
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
