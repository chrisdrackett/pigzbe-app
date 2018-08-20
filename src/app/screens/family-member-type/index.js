import React, {Component} from 'react';
import {connect} from 'react-redux';
import Toggle from '../../components/toggle';
import {SCREEN_BALANCE} from '../../constants';
import StepModule from '../../components/step-module';
import {
    color
} from '../../styles';
// import TextInputComponent from '../../components/text-input';
// import {familyAddKid} from '../../actions';

const buttonStyle = {
    background: 'transparent',
    border: color.blue,
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
        // await this.props.dispatch(familyAddKid(name, '01/01/2012', null));
        // this.setState({loading: false});
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
                <Toggle
                    style={buttonStyle}
                    label={'Dad'}
                    onPress={() => {
                        this.setState({type: 'dad'});
                    }}
                    active={this.state.type === 'dad'}
                />
                <Toggle
                    style={buttonStyle}
                    label={'Mum'}
                    onPress={() => {
                        this.setState({type: 'mum'});
                    }}
                    active={this.state.type === 'mum'}
                />
            </StepModule>
        );
    }
}

export default connect()(FamilyMemberType);
