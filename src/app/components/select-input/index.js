import React, {Component, Fragment} from 'react';
import {Text, View, Image, Picker, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";
import styles from './styles';
import isAndroid from '../../utils/is-android';
import BaseInputField from '../base-input-field';
import SearchableList from 'app/components/searchable-list';
import StepModule from 'app/components/step-module';

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

    getOptions() {
        const {options} = this.props;
        if (Array.isArray(options)) {
            return options.reduce((obj, option) => {
                obj[option] = option;
                return obj;
            }, {});
        }
        return options;
    }

    render() {
        const {
            placeholder,
            onChangeSelection,
            error = false,
            value = '',
            label,
            style,
            searchable,
        } = this.props;

        const options = this.getOptions();

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
                        <Text style={styles.text}>{options[value]}</Text>
                    }
                    {!value &&
                        <Text></Text>
                    }
                    <Image style={[styles.arrow, searchable ? styles.arrowSearchable : null]} source={require('./images/down-arrow.png')} />
                </TouchableOpacity>

                {!searchable &&
                    <Modal
                        isVisible={this.state.open}
                        style={{
                            margin: 0,
                        }}
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
                                    {Object.keys(options).map(key =>
                                        <Picker.Item key={key} label={options[key]} value={key} />
                                    )}
                                </Picker>
                            </View>
                        </View>
                    </Modal>
                }
                {searchable &&
                    <Modal
                        isVisible={this.state.open}
                        animationIn="slideInRight"
                        animationOut="slideOutRight"
                        style={{
                            margin: 0,
                        }}
                    >
                        <StepModule
                            onBack={() => this.setState({open: false})}
                        >
                            <SearchableList
                                selectedKey={value}
                                onChangeSelection={key => {
                                    onChangeSelection(key);
                                    this.setState({open: false});
                                }}
                                items={options}
                            />
                        </StepModule>
                    </Modal>
                }
            </BaseInputField>
        );
    }
}
