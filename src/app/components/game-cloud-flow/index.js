import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import GameCloud from '../game-cloud';
import GameMessageBubble from '../game-message-bubble';
import styles from './styles';

export class CloudFlow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: null,
            showBubble: false,
        };
    }

    componentDidMount() {
    }

    cloudClicked = () => {
        console.log('cloudClicked', this.props.type);
        switch (this.props.type) {
            case 'ALLOWANCE':
                this.setState({
                    status: 'ALLOWANCE_CLOUD',
                    showBubble: true
                });
                break;
            case 'TASK':
                this.setState({
                    status: 'ALLOWANCE_QUESTION',
                    showBubble: true
                });
                break;
            default:
        }
    }

    getBubbleContent() {
        return "CONTENT";
    }

    render() {
        const {value, type, callback, name} = this.props;
        const {showBubble} = this.state;

        return (
            <View style={styles.outer} onPress={callback}>
                <GameCloud type={type} value={value} name={name} callback={this.cloudClicked} />
                {
                    showBubble && <GameMessageBubble content={this.getBubbleContent()} />
                }
            </View>
        );
    }
}

export default CloudFlow;
