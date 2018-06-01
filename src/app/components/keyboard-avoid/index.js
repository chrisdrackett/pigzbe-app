import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import isDesktop from '../../utils/is-desktop';

export default ({children, style}) => {
    if (isDesktop) {
        return children;
    }
    return (
        <KeyboardAvoidingView
            contentContainerStyle={style}
            behavior="position"
            enabled>
            {children}
        </KeyboardAvoidingView>
    );
};
