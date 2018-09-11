import React, {Fragment} from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import TextInput from '../../src/app/components/text-input';
import SelectInput from '../../src/app/components/select-input';
import DateInput from '../../src/app/components/date-input';

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
    static defaultProps = {
        type: 'text',
    }
    render() {
        const {
            value,
            type,
            ...otherProps
        } = this.props;

        if (type === 'select') {
            return (
                <SelectInput
                    {...otherProps}
                    value={this.state.value}
                    onChangeSelection={value => this.setState({value})}
                    options={['', 'Mr', 'Mrs', 'Miss', 'Ms', 'Sir', 'Dr']}
                />
            );
        }
        if (type === 'date') {
            return (
                <DateInput
                    {...otherProps}
                    value={this.state.value}
                    onChangeSelection={value => this.setState({value})}
                />
            );
        }
        return (
            <TextInput
                {...otherProps}
                value={this.state.value}
                onChangeText={value => this.setState({value})}
            />
        );
    }
}

storiesOf('TextInput')
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
    ))
    .add('lots of fields', () => (
        <View style={style}>
            <StatefulTextInput
                error={false}
                placeholder={'First name gg'}
            />
            <StatefulTextInput
                error={false}
                placeholder={'Last name'}
                value="Soloman"
            />
            <StatefulTextInput
                error={false}
                placeholder={'Title'}
                type='select'
            />
            <StatefulTextInput
                error={false}
                placeholder={'Last name'}
                value="Soloman"
                error="We have an error..."
            />
            <StatefulTextInput
                error={false}
                placeholder={'Date of birth'}
                type='date'
            />
            <StatefulTextInput
                error={false}
                value={''}
                placeholder={'Secret key'}
                onChangeText={() => {}}
                numberOfLines={2}
                returnKeyType="done"
            />
            <StatefulTextInput
                error={false}
                value={'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris. is facilisis fermentum is facilisis fermentum test test'}
                placeholder={'Secret key'}
                onChangeText={() => {}}
                numberOfLines={4}
                returnKeyType="done"
            />
            <StatefulTextInput
                error={false}
                value={''}
                placeholder={'Secret key'}
                onChangeText={() => {}}
                numberOfLines={2}
                returnKeyType="done"
                showTopPlaceholder
            />
            <StatefulTextInput
                error={false}
                value={'Donec nec justo eget felis facilisis fermentum. '}
                placeholder={'Secret key'}
                onChangeText={() => {}}
                numberOfLines={3}
                returnKeyType="done"
                showTopPlaceholder
            />
        </View>
    ));
