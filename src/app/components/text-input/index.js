import React, {Component} from 'react';
import {TextInput} from 'react-native';
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

        if (this.props.autoFocus && this.inputBox) {
            this.inputBox.focus();
        }
    }

    getStyle() {
        const {style, numberOfLines = 1, showTopPlaceholder} = this.props;

        let paddingTop;
        if (numberOfLines > 1) {
            paddingTop = showTopPlaceholder === true ? 20 : 12;
        } else {
            paddingTop = showTopPlaceholder === false ? 0 : 10;
        }

        let s = [styles.input, {
            width: this.state.inputWidth,
            paddingTop,
        }];

        if (isAndroid) {
            if (numberOfLines === 1) {
                s = s.concat({
                    marginTop: 12,
                    paddingLeft: 0,
                    paddingRight: 0,
                })
            } else {
                s = s.concat({
                    paddingLeft: 0,
                    paddingRight: 0,
                })
            }
        }

        if (style) {
            s = s.concat(style);
        }

        return s;
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
            editable = true,
            keyboardType = 'default',
            autoCapitalize = 'sentences',
            autoCorrect = true,
            returnKeyType = 'done',
            baseStyle = null
        } = this.props;

        let showTopPlaceholder = this.props.showTopPlaceholder;
        if (showTopPlaceholder === undefined) { // default
            showTopPlaceholder = numberOfLines === 1;
        }


        return (
            <BaseInputField
                label={label}
                borderRadius={numberOfLines > 1 ? 5 : undefined}
                error={error}
                placeholder={placeholder}
                placeholderTop={this.state.focused || !!value}
                height={numberOfLines > 1 ? getHeight(numberOfLines, 10) : undefined}
                showTopPlaceholder={showTopPlaceholder}
                style={baseStyle}
            >
                <TextInput
                    ref={el => (this.inputBox = el)}
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
