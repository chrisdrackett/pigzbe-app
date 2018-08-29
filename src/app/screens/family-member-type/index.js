import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Dimensions} from 'react-native';
import Toggle from '../../components/toggle';
import {SCREEN_BALANCE, SCREEN_FAMILY_NUMBER_KIDS} from '../../constants';
import StepModule from '../../components/step-module';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
import {familyParentNickname} from '../../actions';
import {
    color
} from '../../styles';

const buttonStyle = {
    background: 'transparent',
    border: color.blue,
    fontSize: 14,
    paddingTop: 10,
    height: 45,
    lineHeight: 40,
    marginBottom: 30,
    width: Dimensions.get('window').width * 0.35,
    textAlign: 'center',
};

const innerStyle = {
    borderRadius: 22.5,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    height: 45,
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

    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE)

    onNext = async () => {
        this.setState({loading: true});
        await this.props.dispatch(familyParentNickname(this.state.type === 'custom' ? this.state.custom : this.state.type));
        this.props.navigation.navigate(SCREEN_FAMILY_NUMBER_KIDS);
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
                        innerStyle={innerStyle}
                        label={'Dad'}
                        onPress={() => {
                            this.setState({type: 'dad', custom: null});
                        }}
                        active={this.state.type === 'dad'}
                    />
                    <Toggle
                        style={buttonStyle}
                        innerStyle={innerStyle}
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
