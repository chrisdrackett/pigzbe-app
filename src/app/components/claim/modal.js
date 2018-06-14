import React, {Fragment} from 'react';
import {Modal, View, Text} from 'react-native';
import Button from '../button';
import styles from './styles';

export default ({
    visible,
    message,
    estimatedCost,
    onConfirm,
    onCancel
}) => (
    <Modal animationType="slide" visible={visible}>
        <View style={styles.modalConfirm}>
            {message === 'confirm' &&
                <Fragment>
                    <Text style={styles.modalTitle}>The estimated gas for this transaction is</Text>
                    <Text style={[styles.modalTitle, styles.modalTitleCost]}>{estimatedCost}</Text>
                    <Text>Are you sure you want to burn your tokens? They will be automatically converted into Stellar Wollo Tokens</Text>
                    <View>
                        <Button
                            label="Confirm"
                            onPress={onConfirm}
                        />
                        <Button
                            label="No"
                            style=""
                            secondary
                            onPress={onCancel}
                        />
                    </View>
                </Fragment>
            }

            {message !== 'confirm' && message !== '' &&
                <Fragment>
                    <Text>{message}</Text>
                </Fragment>
            }
        </View>
    </Modal>
);
