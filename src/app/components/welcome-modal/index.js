import React from 'react';
import ReactModal from 'react-native-modal';
import Modal from 'app/components/modal';
import Title from 'app/components/title';
import Paragraph from 'app/components/paragraph';
import IconButton from 'app/components/icon-button';
import Button from 'app/components/button';

export default ({isVisible, onClose, onFundingInfo, onSettings, onModalHide}) => (
    <ReactModal
        isVisible={isVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{margin: 0}}
        onBackButtonPress={onClose}
        onModalHide={onModalHide}
    >
        <Modal>
            <Title dark>Wallet Inactive</Title>
            <Paragraph>To activate your wallet please fund it by sending 1.6 XLM to your *public address*</Paragraph>
            <Paragraph style={{marginBottom: 40}}>Alternatively, If you’re an *ICO*, *Airdrop* or *VIP* participant, claim your Wollo via settings.</Paragraph>
            <Button
                label="Learn how to activate wallet"
                onPress={onFundingInfo}
            />
            <Button
                theme="outline"
                label={'Go to settings'}
                onPress={onSettings}
            />
            <IconButton
                style={{position: 'absolute', top: 0, right: 0}}
                icon="crossBlue"
                size={20}
                padding={16}
                onPress={onClose}
            />
        </Modal>
    </ReactModal>
);
