import React, {Component} from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, Dimensions} from 'react-native';
import Toggle from '../../src/app/components/toggle';
import {color} from '../../src/app/styles';


const buttonStyle = {
    background: 'transparent',
    border: color.blue,
    fontSize: 14,
    paddingTop: 10,
    height: 45,
    lineHeight: 40,
    marginBottom: 20,
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
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    height: Dimensions.get('window').height,
};

class ToggleWrap extends Component {
    state = {
        active: null,
    }

    render() {
        const {active} = this.state;

        return (
            <View
                style={flexStyle}
            >
                <Toggle
                    style={buttonStyle}
                    innerStyle={innerStyle}
                    label={'Dad'}
                    onPress={() => {
                        this.setState({active: 'dad'});
                    }}
                    active={active === 'dad'}
                />
                <Toggle
                    style={buttonStyle}
                    innerStyle={innerStyle}
                    label={'Mum'}
                    onPress={() => {
                        this.setState({active: 'mum'});
                    }}
                    active={active === 'mum'}
                />
            </View>
        );
    }
}

storiesOf('Toggle')
    .add('toggles example', () => (
        <ToggleWrap />
    ));
