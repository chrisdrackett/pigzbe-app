import React from 'react';
import NotificationModal from 'app/components/notification-modal';

export default ({
    title,
    text,
    cancel,
    confirm,
    open,
    onConfirm,
    onCancel,
    type
}) => (
    <NotificationModal
        open={open}
        type={type || 'warning'}
        title={title}
        text={text}
        onRequestClose={onCancel}
        buttonLabel={cancel}
        onButtonPress={onCancel}
        buttonLabelB={confirm}
        onButtonPressB={onConfirm}
    />
);
