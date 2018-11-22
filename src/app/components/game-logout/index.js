import React from 'react';
import {View} from 'react-native';
import RNModal from 'react-native-modal';
import Modal from '../modal';
import styles from './styles';
import Button from '../button';
import Title from '../title';
import Paragraph from '../paragraph';

export default ({
    open,
    onConfirm,
    onCancel
}) => (
    <RNModal isVisible={open} style={{margin: 0}} onBackButtonPress={onCancel}>
        <Modal noBird>
            <View>
                <Title dark style={styles.title}>Logout?</Title>
                <Paragraph small style={styles.bold}>
                    Please confirm you would like to logout
                </Paragraph>
                <View style={styles.buttons}>
                    <Button
                        theme="outline"
                        label="Cancel"
                        onPress={onCancel}
                        style={styles.button}
                    />
                    <Button
                        label="Logout"
                        onPress={onConfirm}
                        style={styles.button}
                    />
                </View>
            </View>
        </Modal>
    </RNModal>
);
