import React, {Fragment} from 'react';
import {TextInput, Text, View} from 'react-native';
import styles from './styles';
import {color} from '../../styles';

const getHeight = (numberOfLines, margin = 0) => ({
    height: 24 + 21 * numberOfLines + margin
});

const getStyle = (error, numberOfLines, style) => {
    let s = [styles.input];

    if (error) {
        s = s.concat(styles.error);
    }

    s = s.concat(getHeight(numberOfLines));

    s = s.concat({
        paddingTop: numberOfLines > 1 ? 11 : 2
    });

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
        {label ? (
            <Text style={styles.label}>
                {label}
            </Text>
        ) : null}
        <View style={[getHeight(numberOfLines, 10), {alignSelf: 'stretch'}]}>
            <TextInput
                style={getStyle(error, numberOfLines, style)}
                placeholder={placeholder}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                placeholderTextColor={color.grey}
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
