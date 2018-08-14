import React, {Component} from 'react';
import {View} from 'react-native';
import ButtonIcon from '../../components/button-icon';
import styles from './styles';
import images from './images';

const keys = [
    'bunny',
    'sheep',
    'frog',
    'chest',
    'pig',
    'wallo',
    'bird',
    'smiley',
    'cow',
];

export default class IconPad extends Component {
    state = {
        inputs: new Set(),
    }

    static defaultProps = {
        maxLength: 3,
        onInput: () => {},
        onFull: () => {},
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error && !this.props.error) {
            this.setState({inputs: new Set()});
            this.props.onInput('');
        }
    }

    onInput = image => {
        if (this.state.inputs.length === this.props.maxLength) {
            return;
        }

        let inputs = new Set(this.state.inputs);
        inputs = inputs.add(String(image));

        this.setState({
            inputs,
        });

        this.props.onInput(inputs);

        if (inputs.length === this.props.maxLength) {
            this.props.onFull(inputs);
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
                {keys.map(b => (
                    <View style={styles.flexEl}>
                        <ButtonIcon
                            key={b}
                            onClick={() => this.onInput(b)}
                            icon={images.icon[b]}
                            selected={this.state.inputs.has(b)}
                        />
                    </View>
                ))}
            </View>
        );
    }
}
