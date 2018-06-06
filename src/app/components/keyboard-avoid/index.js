import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import isDesktop from '../../utils/is-desktop';

export default ({children}) => {
    if (isDesktop) {
        return children;
    }
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={0}
            style={{flex: 1}}
            behavior="position"
            enabled>
            {children}
        </KeyboardAvoidingView>
    );
};
