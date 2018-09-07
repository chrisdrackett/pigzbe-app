import React, {Component, Fragment} from 'react';
import {Text, View, Image, Picker, TouchableOpacity, Modal} from 'react-native';
import styles from './styles';
import isAndroid from '../../utils/is-android';
import BaseInputField from '../base-input-field';

const padding = isAndroid ? 11 : 0;


export default class SelectInputComponent extends Component {

    state = {
        open: false,
    }

    onOpen = () => {
        this.setState({open: true});
    }

    onClose = () => {
        this.setState({open: false});
    }

    render() {
        const {
            placeholder,
            options,
            onChangeSelection,
            error = false,
            value = '',
            label,
            style,
        } = this.props;

        return (
            <BaseInputField 
                label={label}
                error={error}
                placeholder={placeholder}
                placeholderTop={!!value}
            >
                <TouchableOpacity
                    style={styles.input}
                    onPress={this.onOpen}
                >
                    {!!value &&
                        <Text style={styles.text}>{value}</Text>
                    }
                    {!value &&
                        <Text></Text>
                    }
                    <Image style={styles.arrow} source={require('./images/down-arrow.png')} />
                </TouchableOpacity>

                {this.state.open &&
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.open}
                        onRequestClose={this.onClose}
                    >
                        <View style={styles.picker}>
                            <TouchableOpacity style={styles.pickerSpacer} onPress={this.onClose} />
                            <View style={styles.pickerBar}>
                                <Text style={styles.pickerBack} onPress={this.onClose}>Done</Text>
                            </View>
                            <View style={styles.pickerContent}>
                                <Picker
                                    selectedValue={value}
                                    onValueChange={(itemValue) => onChangeSelection(itemValue)}
                                    itemStyle={styles.pickerItem}>
                                    {options.map(option =>
                                        <Picker.Item key={option} label={option} value={option} />
                                    )}
                                </Picker>
                            </View>
                        </View>
                    </Modal>
                }
            </BaseInputField>
        );
    }
}
