import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import isDesktop from '../../utils/is-desktop';

export default ({children, style, header}) => {
    if (isDesktop) {
        return children;
    }
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={header ? -70 : 0}
            contentContainerStyle={style}
            behavior="position"
            enabled>
            {children}
        </KeyboardAvoidingView>
    );
};
