import React, {Fragment} from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import TextInput from '../../src/app/components/text-input';

const style = {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 40,
};

class StatefulTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
        }
    }
    render() {
        const {
            value,
            onChangeText,
            ...otherProps
        } = this.props;
        return (
            <TextInput
                {...otherProps}
                value={this.state.value}
                onChangeText={value => this.setState({value})}
            />
        )
    }
}

storiesOf('TextInput')
    .add('multi test', () => (
        <View style={style}>
            <StatefulTextInput
                error={false}
                placeholder={'first name'}
            />
            <StatefulTextInput
                error={false}
                placeholder={'last name'}
                value="Soloman"
            />
            <StatefulTextInput
                error={false}
                value={''}
                placeholder={'secret key'}
                onChangeText={() => {}}
                numberOfLines={3}
                returnKeyType="done"
            />
            <StatefulTextInput
                error={false}
                value={'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris.'}
                placeholder={'secret key'}
                onChangeText={() => {}}
                numberOfLines={4}
                returnKeyType="done"
            />
        </View>
    ))
    .add('default', () => (
        <View style={style}>
            <StatefulTextInput
                error={false}
                placeholder={'secret key'}
            />
        </View>
    ))
    .add('with text', () => (
        <View style={style}>
            <StatefulTextInput
                error={false}
                value={'Lorem ipsum dolor'}
                placeholder={'secret key'}
                onChangeText={() => {}}
            />
        </View>
    ))
    .add('multiline', () => (
        <View style={style}>
            <StatefulTextInput
                error={false}
                value={''}
                placeholder={'secret key'}
                onChangeText={() => {}}
                numberOfLines={3}
                returnKeyType="done"
            />
        </View>
    ))
    .add('multiline with text', () => (
        <View style={style}>
            <StatefulTextInput
                error={false}
                value={'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.'}
                placeholder={'secret key'}
                onChangeText={() => {}}
                numberOfLines={3}
                returnKeyType="done"
            />
        </View>
    ))
    .add('multiline with text 2', () => (
        <View style={style}>
            <StatefulTextInput
                error={false}
                value={'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris.'}
                placeholder={'secret key'}
                onChangeText={() => {}}
                numberOfLines={3}
                returnKeyType="done"
            />
        </View>
    ))
    .add('multiline with text 3', () => (
        <View style={style}>
            <StatefulTextInput
                error={false}
                value={'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris.'}
                placeholder={'secret key'}
                onChangeText={() => {}}
                numberOfLines={4}
                returnKeyType="done"
            />
        </View>
    ))
    .add('with label', () => (
        <View style={style}>
            <StatefulTextInput
                label={'Lorem ipsum'}
                error={false}
                value={''}
                placeholder={'secret key'}
                onChangeText={() => {}}
            />
        </View>
    ))
    .add('error', () => (
        <View style={style}>
            <StatefulTextInput
                error={true}
                value={''}
                placeholder={'secret key'}
                onChangeText={() => {}}
                numberOfLines={4}
                returnKeyType="done"
            />
        </View>
    ));
