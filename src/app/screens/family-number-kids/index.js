import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Dimensions} from 'react-native';
import Toggle from '../../components/toggle';
import {SCREEN_BALANCE, SCREEN_FAMILY_ENTER_CHILD} from '../../constants';
import StepModule from '../../components/step-module';
import Button from '../../components/button';
import {color} from '../../styles';
import {familyNumKidsToAdd} from '../../actions';

const buttonStyle = {
    background: 'transparent',
    border: color.blue,
    width: Dimensions.get('window').width * 0.15,
    height: 0,
    paddingBottom: Dimensions.get('window').width * 0.15,
    marginBottom: Dimensions.get('window').width * 0.15,
    position: 'relative',
};

const innerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    marginBottom: 0,
    borderRadius: Dimensions.get('window').width * 0.075,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
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
        this.setState({loading: true});
        await this.props.dispatch(familyNumKidsToAdd(this.state.type));
        console.log('nickname added');
        this.props.navigation.navigate(SCREEN_FAMILY_ENTER_CHILD);
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
                <View
                    style={flexStyle}
                >
                    <Toggle
                        style={buttonStyle}
                        innerStyle={innerStyle}
                        label={'1'}
                        onPress={() => {
                            this.setState({type: 1});
                        }}
                        active={this.state.type === 1}
                    />
                    <Toggle
                        style={buttonStyle}
                        innerStyle={innerStyle}
                        label={'2'}
                        onPress={() => {
                            this.setState({type: 2});
                        }}
                        active={this.state.type === 2}
                    />
                    <Toggle
                        style={buttonStyle}
                        innerStyle={innerStyle}
                        label={'3'}
                        onPress={() => {
                            this.setState({type: 3});
                        }}
                        active={this.state.type === 3}
                    />
                    <Toggle
                        style={buttonStyle}
                        innerStyle={innerStyle}
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
