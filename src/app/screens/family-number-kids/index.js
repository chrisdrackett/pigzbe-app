import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Toggle from '../../components/toggle';
import {SCREEN_BALANCE} from '../../constants';
import StepModule from '../../components/step-module';
import Button from '../../components/button';
import {
    color
} from '../../styles';
// import {familyAddKid} from '../../actions';

const buttonStyle = {
    background: 'transparent',
    border: color.blue,
    width: 45,
};

const flexStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
};

export class FamilyNumberKids extends Component {
    state = {
        loading: false,
        type: null,
    }

    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE)

    onNext = async () => {
        // const names = ['Ella', 'Sebastian', 'Billy', 'Bobby'];
        // const name = names[Math.floor(Math.random() * names.length)];
        this.setState({loading: true});
        // await this.props.dispatch(familyAddKid(name, '01/01/2012', null));
        // this.setState({loading: false});
    }

    onNext = () => {
        console.log('go to next screen');
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
                        label={'1'}
                        onPress={() => {
                            this.setState({type: 1});
                        }}
                        active={this.state.type === 1}
                    />
                    <Toggle
                        style={buttonStyle}
                        label={'2'}
                        onPress={() => {
                            this.setState({type: 2});
                        }}
                        active={this.state.type === 2}
                    />
                    <Toggle
                        style={buttonStyle}
                        label={'3'}
                        onPress={() => {
                            this.setState({type: 3});
                        }}
                        active={this.state.type === 3}
                    />
                    <Toggle
                        style={buttonStyle}
                        label={'4+'}
                        onPress={() => {
                            this.setState({type: 4});
                        }}
                        active={this.state.type === 4}
                    />
                </View>
                <Button
                    label={'Next'}
                    disabled={this.state.type === null}
                    onPress={this.onNext}
                />
            </StepModule>
        );
    }
}

export default connect()(FamilyNumberKids);
