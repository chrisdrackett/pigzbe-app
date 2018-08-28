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
import images from './images';


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


        console.log('member added', this.props.numKidsToAdd);
        if (this.props.numKidsToAdd > 0) {
            this.setState({
                loading: false,
                name: '',
                chosenDate: null,
                datePickerHasChanged: false,
                image: '',
            });
        } else {
            this.props.navigation.navigate(SCREEN_BALANCE);
        }
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

        const {numKidsToAdd, numKidsAdded} = this.props;

        let title = 'Create their profile';

        if (numKidsToAdd === 1 && numKidsAdded === 0) {
            title = 'Create their profile';
        } else if (numKidsToAdd > 1 && numKidsAdded === 0) {
            title = 'Create 1st profile';
        } else if (numKidsAdded === 1) {
            title = 'Create 2nd profile';
        } else if (numKidsAdded === 2) {
            title = 'Create 3rd profile';
        } else if (numKidsAdded > 2) {
            title = `Create ${numKidsAdded + 1}th profile`;
        }

        let numberProfile = '';

        console.log('numKidsToAdd', numKidsToAdd, 'numKidsAdded');

        if (numKidsToAdd !== 1 || numKidsAdded !== 0) {
            numberProfile = ` ${numKidsAdded + 1}`;
        }

        console.log('this.state.image', this.state.image, 'images.icon.smiley', images.icon.smiley);

        return (
            <StepModule
                title={title}
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
                        value={this.state.name}
                    />
                    {renderDatePicker()}
                    <Text style={styles.smallText}>
                        This helps us serve appropriate content
                    </Text>
                </View>
                <Text style={styles.subTitle}>Add photo</Text>
                { this.state.image ?
                    <Image
                        style={styles.imageStyle}
                        source={{uri: this.state.image ? this.state.image : images.icon.smiley}}
                    />
                    :
                    <View style={styles.imageStyle} />
                }
                <Button onPress={this.getImage} label={'Get Image'} />
                <Button
                    label={`Create Profile${numberProfile}`}
                    disabled={!this.state.datePickerHasChanged || this.state.name.length === 0}
                    onPress={this.onNext}
                />
                <Text style={styles.smallText}>
                    Your childs data will always be kept secure and never shared!
                    Check our Privacy Policy for more details
                </Text>
            </StepModule>
        );
    }
}

export default connect(state => ({
    numKidsToAdd: state.family.numKidsToAdd,
    numKidsAdded: state.family.numKidsAdded,
}))(FamilyEnterChild);
