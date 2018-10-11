import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {pickImage} from '../../utils/image-picker';
import {SCREEN_ALLOWANCE_AMOUNT} from '../../constants';
import TextInput from '../../components/text-input';
import DateInput from '../../components/date-input';
import StepModule from '../../components/step-module';
import Button from '../../components/button';
import styles from './styles';
import {addKid} from '../../actions';
import images from './images';

export class KidsEnterProfile extends Component {
    state = {
        loading: false,
        name: '',
        chosenDate: null,
        datePickerHasChanged: false,
        image: '',
    }

    onBack = () => this.props.navigation.goBack();

    onNext = async () => {
        this.setState({loading: true});
        await this.props.dispatch(addKid(this.state.name, this.state.chosenDate, this.state.image));

        if (this.props.numKidsToAdd > 0) {
            this.setState({
                loading: false,
                name: '',
                chosenDate: null,
                datePickerHasChanged: false,
                image: '',
            });
        } else {
            // add allowance for all kids:
            this.props.navigation.push(SCREEN_ALLOWANCE_AMOUNT, {currency: 'GBP'});
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
                        placeholder="Nickname"
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
                <TouchableOpacity onPress={this.getImage}>
                    <Text style={styles.subTitle}>Add image</Text>
                    <Image
                        style={styles.imageStyle}
                        source={this.state.image ? {uri: this.state.image} : images.icon.smiley}
                    />
                </TouchableOpacity>
                {/* <Button onPress={this.getImage} label={'Get Image'} /> */}
                <Button
                    label={`Create Profile${numberProfile}`}
                    disabled={!this.state.datePickerHasChanged || this.state.name.length === 0}
                    onPress={this.onNext}
                />
                <Text style={styles.smallText}>
                    Your child's data will always be kept secure and never shared!
                    Check our Privacy Policy for more details
                </Text>
            </StepModule>
        );
    }
}

export default connect(state => ({
    numKidsToAdd: state.kids.numKidsToAdd,
    numKidsAdded: state.kids.numKidsAdded,
}))(KidsEnterProfile);
