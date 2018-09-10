import React, {Component, Fragment} from 'react';
import {Text, View, Image, Picker, TouchableOpacity, Modal} from 'react-native';
import styles from './styles';
import isAndroid from '../../utils/is-android';
import SearchableList from 'app/components/searchable-list';
import StepModule from 'app/components/step-module';

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
                        <Text style={styles.text}>{options[value]}</Text>
                    }
                    {!value &&
                        <Text style={styles.placeholder}>{placeholder}</Text>
                    }
                    <Image style={[styles.arrow, searchable ? styles.arrowSearchable : null]} source={require('./images/down-arrow.png')} />
                </TouchableOpacity>

                {!searchable &&
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
                        animationType="slide"
                        transparent={true}
                        visible={this.state.open}
                        onRequestClose={this.onClose}
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
        );
    }
}
