import React, {Component} from 'react';
import Button from '../../components/button';
import Modal from '../../components/modal';
import Title from '../../components/title';
import Paragraph from '../../components/paragraph';
import openURL from '../../utils/open-url';
import ReactModal from 'react-native-modal';

export default class FundingMessage extends Component {
    onFundLink = () => {
        openURL('https://pigzbe.com/fund-your-account');
        this.props.onClose();
    }

    onSettings = () => this.props.onSettings();

    onClose = () => this.props.onClose();

    render () {
        return (
            <ReactModal
                isVisible={this.props.isVisible}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={{margin: 0}}
            >
                <Modal>
                    <Title dark>Activate!</Title>
                    <Paragraph>To fully activate your wallet you need to transfer funds into it.</Paragraph>
                    <Paragraph>If you’re an *ICO* participant, you can do this via settings.</Paragraph>
                    <Paragraph style={{marginBottom: 40}}>For full instructions click 'Fund your account' below.</Paragraph>
                    <Button
                        theme="outline"
                        label={'Fund your account'}
                        onPress={this.onFundLink}
                    />
                    <Button
                        theme="outline"
                        label={'Go to settings'}
                        onPress={this.onSettings}
                    />
                    <Button
                        label={'I’ll do this later'}
                        onPress={this.onClose}
                    />
                </Modal>
            </ReactModal>
        );
    }
}
