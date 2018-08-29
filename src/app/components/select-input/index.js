import React, {Component, Fragment} from 'react';
import {Text, View, Image, Picker, TouchableOpacity, Modal} from 'react-native';
import styles from './styles';
import isAndroid from '../../utils/is-android';

const padding = isAndroid ? 11 : 0;

const getStyle = (error, style) => {

    let s = [styles.input, {
        paddingTop: padding,
    }];

    if (error) {
        s = s.concat(styles.error);
    }

    if (style) {
        s = s.concat(style);
    }

    return s;
};

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
            <Fragment>
                {label && (
                    <Text style={styles.label}>
                        {label}
                    </Text>
                )}
                <TouchableOpacity
                    style={getStyle(error, style)}
                    onPress={this.onOpen}
                >
                    {!!value &&
                        <Text style={styles.text}>{value}</Text>
                    }
                    {!value &&
                        <Text style={styles.placeholder}>{placeholder}</Text>
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
            </Fragment>
        );
    }
}
