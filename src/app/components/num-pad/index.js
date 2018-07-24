import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';

const DelKey = ({onPress}) => (
    <TouchableOpacity
        onPress={onPress}>
        <View style={styles.numKey}>
            <Image source={require('./images/del.png')} style={styles.del} />
        </View>
    </TouchableOpacity>
);

const NumKey = ({num, onPress}) => (
    <TouchableOpacity
        onPress={() => onPress(num)}>
        <View style={styles.numKey}>
            <Text style={styles.num}>
                {num}
            </Text>
        </View>
    </TouchableOpacity>
);

export default class NumPad extends Component {
    state = {
        input: ''
    }

    onInput = num => {
        if (this.state.input.length === this.props.length) {
            return;
        }

        const input = this.state.input + String(num);

        this.setState({input});
        this.props.onInput(input);

        if (input.length === this.props.length) {
            this.props.onFull(input);
        }
    }

    onDelete = () => {
        const input = this.state.input.slice(0, this.state.input.length - 1);

        this.setState({input});
        this.props.onInput(input);
    }

    render() {
        return (
            <View style={styles.numpad}>
                <View style={styles.row}>
                    <NumKey num={1} onPress={this.onInput}/>
                    <NumKey num={2} onPress={this.onInput}/>
                    <NumKey num={3} onPress={this.onInput}/>
                </View>
                <View style={styles.row}>
                    <NumKey num={4} onPress={this.onInput}/>
                    <NumKey num={5} onPress={this.onInput}/>
                    <NumKey num={6} onPress={this.onInput}/>
                </View>
                <View style={styles.row}>
                    <NumKey num={7} onPress={this.onInput}/>
                    <NumKey num={8} onPress={this.onInput}/>
                    <NumKey num={9} onPress={this.onInput}/>
                </View>
                <View style={styles.row}>
                    <View style={styles.numKey}/>
                    <NumKey num={0} onPress={this.onInput}/>
                    <DelKey onPress={this.onDelete}/>
                </View>
            </View>
        );
    }
}

NumPad.defaultProps = {
    length: 6,
    onInput: () => {},
    onFull: () => {},
};
