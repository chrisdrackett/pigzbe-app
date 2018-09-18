import React, {Component} from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import SelectInput from '../../src/app/components/select-input';

const style = {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 40,
};


class SelectInputTest extends Component {
    state = {
        value: ''
    }

    onInput = input => this.setState({input})

    onFull = input => this.setState({input})

    render() {
        const {error, searchable} = this.props;
        return (
            <View style={style}>
                <SelectInput
                    error={!!error}
                    value={this.state.value}
                    placeholder={'Title'}
                    onChangeSelection={value => this.setState({value})}
                    options={['Mr', 'Mrs', 'Miss', 'Ms', 'Sir', 'Dr']}
                    searchable={searchable}
                />
            </View>
        );
    }
}

storiesOf('SelectInput')
    .add('default', () => <SelectInputTest />)
    .add('error', () => <SelectInputTest error />)
    .add('searchable', () => <SelectInputTest searchable />);
