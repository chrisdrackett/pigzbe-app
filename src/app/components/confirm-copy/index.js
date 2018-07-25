import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Button from '../button';
import Modal from '../modal';
import Title from '../title';
import Paragraph from '../paragraph';

export default class ConfirmCopy extends Component {
    state = {
        confirmed: false
    }

    onConfirm() {
        this.setState({confirmed: true});
    }

    render() {
        const {confirmed} = this.state;

        const {
            onBack,
            onNext
        } = this.props;

        return (
            <Modal>
                <Title dark>Saved you keys?</Title>
                <Paragraph>
                        You will not be able to view your keys beyond this point. You *MUST* make a secure copy BEFORE you proceed.
                </Paragraph>
                <TouchableOpacity style={styles.checkbox} onPress={() => this.setState({confirmed: !confirmed})}>
                    <View style={confirmed ? [styles.checkboxCheck, styles.checkboxActive] : styles.checkboxCheck} />
                    <Text style={[styles.subtitle, styles.warning, styles.checkboxText]}>
                        {'I confirm I have made a secure copy of my wallet keys'}
                    </Text>
                </TouchableOpacity>
                <Button
                    secondary
                    disabled={!confirmed}
                    label="I'm ready"
                    onPress={onNext}
                    style={{marginBottom: 20}}
                />
                <Button
                    outline
                    label="Back"
                    onPress={onBack}
                />
            </Modal>
        );
    }
}
