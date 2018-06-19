import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import isDesktop from '../../utils/is-desktop';

export default ({children, offset = 0, containerStyle}) => {
    if (isDesktop) {
        return children;
    }
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={offset}
            style={{flex: 1}}
            contentContainerStyle={containerStyle}
            behavior="position"
            enabled>
            {children}
        </KeyboardAvoidingView>
    );
};
