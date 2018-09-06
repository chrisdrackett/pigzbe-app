import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import ActionSheet from '../../src/app/components/action-sheet';
import Button from '../../src/app/components/button';

const options = [
    "Passport",
    "Driver's Licence",
    "National ID card"
];

class ActionSheetText extends Component {
    state = {
        open: false,
        selectedOption: null,
    }
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'rgb(0, 50, 120)',
                padding: 40,
                justifyContent: 'center',
            }}>
                <Button
                    label="Press me"
                    onPress={() => this.setState({open: true})}
                />
                {this.state.selectedOption !== null &&
                    <Text style={{color: 'white', textAlign: 'center', marginTop: 10}}>
                        Last selected: {options[this.state.selectedOption]}
                    </Text>
                }
                <ActionSheet
                    open={this.state.open}
                    options={options}
                    title="Select a document"
                    onRequestClose={() => this.setState({open: false})}
                    onSelect={index => this.setState({
                        open: false,
                        selectedOption: index,
                    })}
                />
            </View>
        )
    }
}

storiesOf('ActionSheet')
    .add('default', () => (
        <ActionSheetText/>
    ));
