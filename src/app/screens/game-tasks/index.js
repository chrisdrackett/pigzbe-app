import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {familyCompleteTask} from '../../actions';
import Wollo from '../../components/wollo';
import Button from '../../components/button';

const Item = ({first, task, reward, onComplete}) => (
    <View>
        <View style={[styles.item, first ? null : styles.itemBorder]}>
            <Text style={styles.itemTitle}>{task}</Text>
            <View style={styles.itemAmount}>
                <Wollo dark balance={reward} />
            </View>
        </View>
        <Button
            label="Complete"
            onPress={() => onComplete({task, reward})}
        />
    </View>
);

export default class GameTasks extends Component {
    state = {
        isOpen: true,
    }

    onOpen = () => this.setState({isOpen: true})

    onClose = () => this.setState({isOpen: false})

    onComplete = task => this.props.dispatch(familyCompleteTask(this.props.kid, task))

    render() {
        const {kid, parentNickname} = this.props;

        if (this.state.isOpen) {
            return (
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.close} onPress={this.onClose}>
                            <Text style={styles.text}>Hide</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>
                            {parentNickname} has set you a new task!
                        </Text>
                        {kid.tasks.length ? (
                            <View style={styles.box}>
                                {kid.tasks.map(({task, reward}, i) => (
                                    <Item
                                        key={i}
                                        first={i === 0}
                                        task={task}
                                        reward={reward}
                                        onComplete={this.onComplete}
                                    />
                                ))}
                            </View>
                        ) : null}
                    </View>
                </View>
            );

        }
        return (
            <View style={styles.button}>
                <Button
                    theme="light"
                    label="Tasks"
                    onPress={this.onOpen}
                />
            </View>
        );
    }
}
