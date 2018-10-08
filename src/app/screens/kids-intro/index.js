import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/button';
import {SCREEN_KIDS_PARENT_NICKNAME, SCREEN_KIDS_ENTER_PROFILE, SCREEN_KIDS_NUMBER_TO_ADD} from '../../constants';
import StepModule from '../../components/step-module';
import {setNumKidsToAdd} from '../../actions';

export class KidsIntro extends Component {

    onBack = () => this.props.navigation.goBack()

    onNext = async () => {
        if ((!this.props.nickname || this.props.nickname.length === 0)) {
            this.props.navigation.push(SCREEN_KIDS_PARENT_NICKNAME);
        } else if (this.props.kids.length === 0) {
            this.props.navigation.push(SCREEN_KIDS_NUMBER_TO_ADD);
        } else {
            await this.props.dispatch(setNumKidsToAdd(1));
            this.props.navigation.push(SCREEN_KIDS_ENTER_PROFILE);
        }
    }

    render() {
        return (
            <StepModule
                title="Your Family"
                icon="family"
                content={'Create secure sub accounts off your own wallet so you can set your children *tasks, goals, rewards* and *recurring allowances*. This all helps to teach them about money in the 21st century.'}
                pad
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
    nickname: state.kids.parentNickname,
    kids: state.kids.kids,
}))(KidsIntro);
