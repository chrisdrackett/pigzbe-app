import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import isDesktop from '../../utils/is-desktop';
import isAndroid from '../../utils/is-android';

export default ({children, offset = 0, containerStyle, pad}) => {
    if (isDesktop) {
        return children;
    }
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={offset}
            style={{flex: 1}}
            contentContainerStyle={containerStyle}
            behavior={isAndroid ? null : pad ? 'padding' : 'position'}
            enabled>
            {children}
        </KeyboardAvoidingView>
    );
};
