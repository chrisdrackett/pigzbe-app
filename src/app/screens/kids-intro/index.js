import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/button';
import {SCREEN_DASHBOARD, SCREEN_KIDS_PARENT_NICKNAME, SCREEN_KIDS_ENTER_PROFILE, SCREEN_KIDS_NUMBER_TO_ADD} from '../../constants';
import StepModule from '../../components/step-module';
import {setNumKidsToAdd} from '../../actions';

export class KidsIntro extends Component {
    state = {loading: false}

    onBack = () => this.props.navigation.navigate(SCREEN_DASHBOARD)

    onNext = async () => {
        this.setState({loading: true});

        if ((!this.props.nickname || this.props.nickname.length === 0)) {
            this.props.navigation.navigate(SCREEN_KIDS_PARENT_NICKNAME);
        } else if (this.props.kids.length === 0) {
            this.props.navigation.navigate(SCREEN_KIDS_NUMBER_TO_ADD);
        } else {
            await this.props.dispatch(setNumKidsToAdd(1));
            this.props.navigation.navigate(SCREEN_KIDS_ENTER_PROFILE);
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
    nickname: state.kids.parentNickname,
    kids: state.kids.kids,
}))(KidsIntro);
