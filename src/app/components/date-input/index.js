import React, {Component} from 'react';
import DatePicker from 'react-native-datepicker';
import BaseInputField from '../base-input-field';

import styles from './styles';

export default class DateInputComponent extends Component {
    render() {
        const {
            placeholder,
            onChangeSelection,
            error = false,
            value = null,
            label,
        } = this.props;

        return (
            <BaseInputField
                label={label}
                error={error}
                placeholder={placeholder}
                placeholderTop={!!value}
            >
                <DatePicker
                    style={{width: '100%'}}
                    date={value}
                    mode="date"
                    placeholder=" "
                    format="DD/MM/YYYY"
                    // minDate="01/01/2000"
                    // maxDate="01/01/2011"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    // this doesn't seem to work properly, need to find different solution in order to implement placeholder design:
                    // TouchableComponent={
                    //     getDateField
                    // }
                    customStyles={{
                        dateIcon: styles.dateIcon,
                        dateInput: styles.dateInput,
                        dateText: styles.dateText,
                        dateTouchBody: styles.dateTouchBody,
                        placeholderText: styles.placeholderText,
                        btnTextConfirm: styles.btnTextConfirm,
                    }}
                    onDateChange={onChangeSelection}
                    showIcon={false}
                />
            </BaseInputField>
        );
    }
}
