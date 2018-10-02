import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import GameCloud from '../game-cloud';
import GameMessageBubble from '../game-message-bubble';
import styles from './styles';

export class CloudFlow extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     status: null,
        //     showBubble: false,
        // };
    }

    componentDidMount() {
    }

    cloudClicked = () => {
        console.log('cloudClicked', this.props.type);
        switch (this.props.type) {
            case 'ALLOWANCE':
                this.props.changeStatus('ALLOWANCE_CLOUD');
                // showBubble: true
                break;
            case 'TASK':
                this.props.changeStatus('TASK_QUESTION');
                break;
            default:
        }
    }

    getBubbleContent() {
        switch (this.props.status) {
            case 'TASK_QUESTION':
                return (
                    <View>
                        <Text style={styles.text}>Have you completed your task?</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.button} onPress={() =>
                                this.props.changeStatus('TASK_GREAT')}>
                                <Text style={styles.buttonText}>YES</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() =>
                                this.props.changeStatus('TASK_FINISH')}>
                                <Text style={styles.buttonText}>NO</Text>
                            </TouchableOpacity>
                        </View>
                    </View>);
            case 'TASK_GREAT':
                return (
                    <View>
                        <Text style={styles.text}>Great, place your finger onto tree to save your 50 Wollo there</Text>
                    </View>);
            case 'TASK_FINISH':
                return (
                    <View>
                        <Text style={styles.text}>Please complete your task before collecting your Wollo</Text>
                    </View>);
            case 'ALLOWANCE_CLOUD':
                return (
                    <View>
                        <Text style={styles.text}>Great, place your finger onto tree to save your 50 Wollo there</Text>
                    </View>
                );
            default:
                return '';
        }
    }

    render() {
        const {value, type, callback, name, status} = this.props;
        const showBubble = status === 'ALLOWANCE_CLOUD' || status === 'TASK_QUESTION' ||
            status === 'TASK_GREAT' || status === 'TASK_FINISH';

        return (
            <View style={styles.outer} onPress={callback}>
                <GameCloud type={type} value={value} name={name} callback={this.cloudClicked} happy={showBubble} />
                {
                    showBubble && <View style={styles.bubbleWrap}><GameMessageBubble content={this.getBubbleContent()} top /></View>
                }
            </View>
        );
    }
}

export default CloudFlow;
