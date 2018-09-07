import React, {Component, Fragment} from 'react';
import {TextInput, Text, View} from 'react-native';
import styles from './styles';
import {color} from '../../styles';
import isAndroid from '../../utils/is-android';
import BaseInputField from '../base-input-field';

const getHeight = (numberOfLines, margin = 0) => 24 + 21 * numberOfLines + margin;



export default class TextInputComponent extends Component {
    // HACK: fixes broken copy/paste on Android https://gist.github.com/ilya-uryupov/7bc9515c6d315d4919ff56ebf4e20411

    state = {
        inputWidth: isAndroid ? '99%' : '100%',
        focused: false,
    }

    updateInputWidth = () => this.setState({inputWidth: '100%'})

    componentDidMount () {
        if (isAndroid) {
            setTimeout(this.updateInputWidth, 100);
        }
    }

    getStyle() {
        const {style, numberOfLines, showMultiLineTopPlaceholder} = this.props;

        let paddingTop = 10;
        if (numberOfLines > 1) {
            paddingTop = showMultiLineTopPlaceholder ? 20 : 12;
        }

        let s = [styles.input, {
            width: this.state.inputWidth,
            paddingTop,
        }];
    
        if (style) {
            s = s.concat(style);
        }
    
        return s;
    };

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
            showMultiLineTopPlaceholder = false,
        } = this.props;

        return (
            <BaseInputField 
                label={label}
                borderRadius={numberOfLines > 1 ? 5 : undefined}
                error={error}
                placeholder={placeholder}
                placeholderTop={this.state.focused || !!value}
                height={numberOfLines > 1 ? getHeight(numberOfLines, 10) : undefined}
                hideTopPlaceholder={numberOfLines > 1 && !showMultiLineTopPlaceholder}
            >
                <TextInput
                    style={this.getStyle()}
                    placeholder={''}
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
                    onFocus={() => this.setState({focused: true})}
                    onBlur={() => this.setState({focused: false})}
                />
            </BaseInputField>
        );
    }
}
