import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/button';
import {SCREEN_WALLET} from '../../constants';
import StepModule from '../../components/step-module';

export class Family extends Component {
    onAdd = () => this.props.navigation.navigate(SCREEN_WALLET)

    render() {
        return (
            <StepModule
                title="Your Family"
                icon="family"
                content={'Create secure sub accounts off your own wallet so you can set your children *tasks, goals, rewards* and *recurring allowances*. This all helps to teach them about money in the 21st century.'}
                pad
            >
                <Button
                    label={'Add My Children'}
                    onPress={this.onAdd}
                />
            </StepModule>
        );
    }
}

export default connect()(Family);
