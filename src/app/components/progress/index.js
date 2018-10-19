import React from 'react';
import NotificationModal from 'app/components/notification-modal';

export default ({
    open,
    title,
    text,
    complete = false,
    onPress,
    error = null,
}) => {
    const type = errorMessage ? 'error' : complete ? 'success' : 'progress';
    const errorMessage = (error && error.message) || error;

    console.log('open', !!open);

    return (
        <NotificationModal
            open={!!open}
            type={type}
            title={title}
            text={errorMessage || text}
            onRequestClose={onPress}
            buttonLabel="Ok"
            hideButton={type === 'progress'}
        />
    );
};
