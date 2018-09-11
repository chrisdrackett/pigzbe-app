import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, Text} from 'react-native';
import {pickImage} from '../../utils/image-picker';
import {SCREEN_BALANCE} from '../../constants';
import TextInput from '../../components/text-input';
import DateInput from '../../components/date-input';
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
        this.setState({loading: true});
        await this.props.dispatch(familyAddKid(this.state.name, this.state.chosenDate, this.state.image));

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

        if (numKidsToAdd !== 1 || numKidsAdded !== 0) {
            numberProfile = ` ${numKidsAdded + 1}`;
        }

        return (
            <StepModule
                title={title}
                icon="family"
                content={'Please give us a few simple details to create their profile'}
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
                    <DateInput
                        placeholder="Date of birth"
                        value={this.state.chosenDate}
                        onChangeSelection={value => this.onChangeDOB(value)}
                    />
                    <Text style={styles.smallText}>
                        This helps us serve appropriate content
                    </Text>
                </View>
                <Text style={styles.subTitle}>Add photo</Text>
                <Image
                    style={styles.imageStyle}
                    source={this.state.image ? {uri: this.state.image} : images.icon.smiley}
                />
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
