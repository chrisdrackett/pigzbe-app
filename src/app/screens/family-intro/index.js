import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/button';
import {SCREEN_BALANCE, SCREEN_FAMILY_MEMBER_TYPE, SCREEN_FAMILY_ENTER_CHILD, SCREEN_FAMILY_NUMBER_KIDS} from '../../constants';
import StepModule from '../../components/step-module';
import {familyNumKidsToAdd} from '../../actions';

export class FamilyIntro extends Component {
    state = {loading: false}

    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE)

    onNext = async () => {
        this.setState({loading: true});

        if ((!this.props.nickname || this.props.nickname.length === 0)) {
            this.props.navigation.navigate(SCREEN_FAMILY_MEMBER_TYPE);
        } else if (this.props.kids.length === 0) {
            this.props.navigation.navigate(SCREEN_FAMILY_NUMBER_KIDS);
        } else {
            await this.props.dispatch(familyNumKidsToAdd(1));
            this.props.navigation.navigate(SCREEN_FAMILY_ENTER_CHILD);
        }
    }

    render() {
        return (
            <StepModule
                title="Your Family"
                icon="family"
                content={'Create secure sub accounts off your own wallet so you can set your children *tasks, goals, rewards* and *recurring allowances*. This all helps to teach them about money in the 21st century.'}
                pad
                loading={this.state.loading}
                onBack={this.onBack}
                justify="flex-end"
            >
                <Button
                    label={'Add My Children'}
                    onPress={this.onNext}
                />
            </StepModule>
        );
    }
}

export default connect(state => ({
    nickname: state.family.parentNickname,
    kids: state.family.kids,
}))(FamilyIntro);
