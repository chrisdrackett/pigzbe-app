import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, Text} from 'react-native';
// import {View, image, TouchableOpacity, Text} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {pickImage} from '../../utils/image-picker';
import {SCREEN_BALANCE} from '../../constants';
import TextInput from '../../components/text-input';
import StepModule from '../../components/step-module';
import Button from '../../components/button';
import {color} from '../../styles';
import styles from './styles';
import {familyAddKid} from '../../actions';


export class FamilyEnterChild extends Component {
    state = {
        loading: false,
        name: '',
        chosenDate: null,
        datePickerHasChanged: false,
        image: '',
    }

    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE);

    onNext = async () => {
        // const names = ['Ella', 'Sebastian', 'Billy', 'Bobby'];
        // const name = names[Math.floor(Math.random() * names.length)];
        this.setState({loading: true});
        console.log('next clicked');
        await this.props.dispatch(familyAddKid(this.state.name, this.state.chosenDate, this.state.image));
        // this.setState({loading: false});
    }

    onChangeName = (name) => {
        this.setState({name});
    }

    onChangeDOB = (dob) => {
        this.setState({chosenDate: dob, datePickerHasChanged: true});
    }

    getImage = async () => {
        const result = await pickImage();

        this.setState({
            image: result.uri,
        });
    }

    render() {
        // note: this feature doesn't seem to work properly
        // todo: try this approach instead: https://github.com/xgfe/react-native-datepicker/issues/73
        // const getDateField = ({onPress}) => {
        //     console.log('onPress', onPress);
        //     return (
        //         <TouchableOpacity
        //             style={{height: 40, width: 300, padding: 4, borderColor: 'gray', borderWidth: 1}}
        //             onPress={onPress}
        //         >
        //             <Text>{moment(this.state.date).format('DD/MM/YYYY')}</Text>
        //         </TouchableOpacity>
        //     );
        // };

        const renderDatePicker = () => (
            <DatePicker
                style={{width: '100%'}}
                date={this.state.chosenDate}
                mode="date"
                placeholder="Date of birth"
                format="DD/MM/YYYY"
                minDate="01/01/2000"
                maxDate="01/01/2011"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                // this doesn't seem to work properly, need to find different solution in order to implement placeholder design:
                // TouchableComponent={
                //     getDateField
                // }
                customStyles={{
                    dateIcon: {
                        display: 'none',
                    },
                    dateInput: {
                        alignSelf: 'stretch',
                        color: color.blue,
                        fontSize: 14,
                        fontWeight: 'bold',
                        borderColor: color.lighterBlue,
                        borderWidth: 1,
                        height: 45,
                        borderRadius: 22.5,
                        marginBottom: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                        textAlignVertical: 'top',
                        texAlign: 'left',
                        lineHeight: 21,
                    },
                    dateText: {
                        color: color.blue,
                        width: '100%',
                        fontWeight: 'bold',
                    },
                    dateTouchBody: {
                        color: color.lighterBlue,
                        height: 45,
                        marginBottom: 20,
                    },
                    placeholderText: {
                        width: '100%',
                        color: color.lighterBlue,
                        fontWeight: 'bold',
                    }
                    // ... You can check the source to find the other keys.
                }}
                onDateChange={
                    (date) => {
                        this.onChangeDOB(date);
                    }
                }
                showIcon={false}
            />
        );

        return (
            <StepModule
                title="Create their profile"
                icon="family"
                content={'Please give us a few simple details to greate their profile'}
                pad
                loading={this.state.loading}
                onBack={this.onBack}
            >
                <View>
                    <TextInput
                        numberOfLines={1}
                        placeholder="Name"
                        onChangeText={this.onChangeName}
                        returnKeyType="done"
                    />
                    {renderDatePicker()}
                </View>
                <Text style={styles.subTitle}>Add photo</Text>
                <Image
                    style={styles.imageStyle}
                    source={{uri: this.state.image}}
                />
                <Button onPress={this.getImage} label={'Get Image'} />
                <Button
                    label={'Next'}
                    disabled={!this.state.datePickerHasChanged || this.state.name.length === 0}
                    onPress={this.onNext}
                />
            </StepModule>
        );
    }
}

export default connect()(FamilyEnterChild);
