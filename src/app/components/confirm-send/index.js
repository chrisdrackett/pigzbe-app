import React from 'react';
import {View} from 'react-native';
import RNModal from 'react-native-modal';
import Modal from '../modal';
import styles from './styles';
import Button from '../button';
import Title from '../title';
import Paragraph from '../paragraph';


export default ({
    name,
    amount,
    onYes,
    onNo
}) => (
    <RNModal isVisible={true} style={{margin: 0}} onBackButtonPress={onNo}>
        <Modal noBird>
            <View>
                <Title dark style={styles.title}>Send Wollo?</Title>
                <Paragraph small style={styles.bold}>
                    Are you sure you want to send {amount} Wollo to {name}?
                </Paragraph>
                <View style={styles.buttons}>
                    <Button
                        theme="outline"
                        label="No"
                        onPress={onNo}
                        style={styles.button}
                    />
                    <Button
                        label="Yes"
                        onPress={onYes}
                        style={styles.button}
                    />
                </View>
            </View>
        </Modal>
    </RNModal>
);
