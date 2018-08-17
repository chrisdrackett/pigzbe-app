import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/button';
import {SCREEN_BALANCE} from '../../constants';
import StepModule from '../../components/step-module';
// import TextInputComponent from '../../components/text-input';
// import {familyAddKid} from '../../actions';

export class FamilyMemberType extends Component {
    state = {loading: false}
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
                <Button
                    label={'Dad'}
                    onPress={() => {}}
                />
                <Button
                    label={'Mum'}
                    onPress={() => {}}
                />
            </StepModule>
        );
    }
}

export default connect()(FamilyMemberType);
