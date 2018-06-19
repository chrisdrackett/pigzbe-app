import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import isDesktop from '../../utils/is-desktop';

export default ({children, offset = 0}) => {
    if (isDesktop) {
        return children;
    }
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={offset}
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
            behavior="position"
            enabled>
            {children}
        </KeyboardAvoidingView>
    );
};
