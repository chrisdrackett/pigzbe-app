import React, {Component, Fragment} from 'react';
import {Text, View, Image, Picker, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import BaseInputField from '../base-input-field';
import SearchableList from 'app/components/searchable-list';
import StepModule from 'app/components/step-module';
import isAndroid from 'app/utils/is-android';

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
            searchable,
        } = this.props;

        const options = this.getOptions();

        const showNativeAndroid = isAndroid && !searchable;

        return (
            <BaseInputField
                label={label}
                error={error}
                placeholder={placeholder}
                placeholderTop={!!value}
            >
                {showNativeAndroid &&
                    <Picker
                        style={{
                            marginLeft: -8,
                            marginTop: 2
                        }}
                        selectedValue={value}
                        onValueChange={(itemValue) => onChangeSelection(itemValue)}
                        itemStyle={styles.pickerItem}>
                        <Picker.Item label="" value="" />
                        {Object.keys(options).filter(key => !!key).map(key =>
                            <Picker.Item key={key} label={options[key]} value={key} />
                        )}
                    </Picker>
                }

                {!showNativeAndroid &&
                    <Fragment>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={this.onOpen}
                        >
                            {!!value &&
                                <Text style={styles.text}>{options[value]}</Text>
                            }
                            {!value &&
                                <Text />
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
                                            <Picker.Item label="" value="" />
                                            {Object.keys(options).filter(key => !!key).map(key =>
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
                    </Fragment>
                }
            </BaseInputField>
        );
    }
}
