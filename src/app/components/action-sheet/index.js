import React from 'react';
import {Text, View, TouchableOpacity, Modal} from 'react-native';
import styles from './styles';

import Button from '../button';

export default ({
    open, title, options, closeText = 'Cancel', onRequestClose, onSelect,
}) => (
    <Modal
        animationType="slide"
        transparent={true} 
        visible={open}
        onRequestClose={onRequestClose}
    >
        <View style={styles.container}>
            <View style={styles.inner}>
                <View style={styles.options}>
                    <Text style={styles.title}>{title}</Text>
                    {options.map((option,i) => (
                        <TouchableOpacity key={i} style={styles.option} onPress={() => onSelect(i)}>
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Button
                    label={closeText}
                    theme="light"
                    onPress={onRequestClose}
                    style={styles.button}
                />
            </View>
        </View>
    </Modal>
);

