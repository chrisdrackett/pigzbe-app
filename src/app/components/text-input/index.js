import React, {Component, Fragment} from 'react';
import {TextInput, Text, View} from 'react-native';
import styles from './styles';
import {color} from '../../styles';
import isAndroid from '../../utils/is-android';

const padding = isAndroid ? 11 : 0;
const paddingMulti = isAndroid ? 11 : 8;

const getHeight = (numberOfLines, margin = 0) => 24 + 21 * numberOfLines + margin;

const getStyle = (error, numberOfLines, style, inputWidth) => {
    let s = [styles.input, {
        borderRadius: numberOfLines > 1 ? 5 : 22.5,
        height: getHeight(numberOfLines),
        paddingTop: numberOfLines > 1 ? paddingMulti : padding,
        width: inputWidth
    }];

    if (error) {
        s = s.concat(styles.error);
    }

    if (style) {
        s = s.concat(style);
    }

    return s;
};

export default class TextInputComponent extends Component {
    // HACK: fixes broken copy/paste on Android https://gist.github.com/ilya-uryupov/7bc9515c6d315d4919ff56ebf4e20411

    state = {
        inputWidth: isAndroid ? '99%' : '100%'
    }

    updateInputWidth = () => this.setState({inputWidth: '100%'})

    componentDidMount () {
        if (isAndroid) {
            setTimeout(this.updateInputWidth, 100);
        }
    }

    render() {
        const {
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
        } = this.props;

        return (
            <Fragment>
                {label && (
                    <Text style={styles.label}>
                        {label}
                    </Text>
                )}
                <View style={{alignSelf: 'stretch', height: getHeight(numberOfLines, 10)}}>
                    <TextInput
                        style={getStyle(error, numberOfLines, style, this.state.inputWidth)}
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
    }
}
