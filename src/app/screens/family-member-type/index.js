import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Toggle from '../../components/toggle';
import {SCREEN_BALANCE, SCREEN_FAMILY_NUMBER_KIDS} from '../../constants';
import StepModule from '../../components/step-module';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
import {familyParentNickname} from '../../actions';
import {
    color
} from '../../styles';
// import TextInputComponent from '../../components/text-input';
// import {familyAddKid} from '../../actions';

const buttonStyle = {
    background: 'transparent',
    border: color.blue,
};

const flexStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
};

export class FamilyMemberType extends Component {
    state = {
        loading: false,
        type: null,
    }
    // onNext = () => this.props.navigation.navigate(SCREEN_FAMILY_NICKNAME)

    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE)

    onNext = async () => {
        // const names = ['Ella', 'Sebastian', 'Billy', 'Bobby'];
        // const name = names[Math.floor(Math.random() * names.length)];
        this.setState({loading: true});
        await this.props.dispatch(familyParentNickname(this.state.name, this.state.chosenDate, this.state.image));
        console.log('nickname added');
        this.props.navigation.navigate(SCREEN_FAMILY_NUMBER_KIDS);
        // await this.props.dispatch(familyAddKid(name, '01/01/2012', null));
        // this.setState({loading: false});
    }

    onChangeText = (text) => {
        this.setState({type: text.length > 0 ? 'custom' : null});
        this.setState({custom: text});
    }

    render() {
        return (
            <StepModule
                title="Describe yourself"
                icon="family"
                content={'What are you called by your children?'}
                pad
                loading={this.state.loading}
                onBack={this.onBack}
            >
                <View
                    style={flexStyle}
                >
                    <Toggle
                        style={buttonStyle}
                        label={'Dad'}
                        onPress={() => {
                            this.setState({type: 'dad', custom: null});
                        }}
                        active={this.state.type === 'dad'}
                    />
                    <Toggle
                        style={buttonStyle}
                        label={'Mum'}
                        onPress={() => {
                            this.setState({type: 'mum', custom: null});
                        }}
                        active={this.state.type === 'mum'}
                    />
                </View>
                <TextInput
                    // error={badAddress}
                    value={this.state.custom}
                    numberOfLines={1}
                    placeholder="Other"
                    onChangeText={this.onChangeText}
                    returnKeyType="done"
                />
                <Button
                    label={'Next'}
                    disabled={this.state.type === null}
                    onPress={this.onNext}
                />
            </StepModule>
        );
    }
}

export default connect()(FamilyMemberType);
