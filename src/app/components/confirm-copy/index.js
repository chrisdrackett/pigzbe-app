import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Button from '../../components/button';
import {color} from '../../styles';

export default class ConfirmCopy extends Component {
    state = {
        confirmed: false
    }

    onConfirm() {
        this.setState({confirmed: true});
    }

    render() {
        const {confirmed} = this.state;

        const {
            onBack,
            onNext
        } = this.props;

        return (
            <View style={styles.confirmCopyOverlay}>
                <View style={styles.confirmCopyContainer}>
                    <Text style={[styles.title, {
                        color: color.orange,
                        marginTop: 0,
                        marginLeft: 0,
                        marginRight: 0,
                    }]}>
                        {'You must save your keys'}
                    </Text>
                    <Text style={[styles.subtitle, {color: color.darkGrey, marginBottom: 0}]}>
                        You will <Text style={{fontWeight: 'bold'}}>not</Text> be able to view your keys beyond this point.
                    </Text>
                    <Text style={[styles.subtitle, {color: color.darkGrey, fontWeight: 'bold'}]}>
                        You MUST make a secure copy BEFORE you proceed.
                    </Text>
                    <TouchableOpacity style={styles.checkbox} onPress={() => this.setState({confirmed: !confirmed})}>
                        <View style={confirmed ? [styles.checkboxCheck, styles.checkboxActive] : styles.checkboxCheck} />
                        <Text style={[styles.subtitle, styles.warning, styles.checkboxText]}>
                            {'I confirm I have made a secure copy of my wallet keys'}
                        </Text>
                    </TouchableOpacity>
                    <Button
                        disabled={!confirmed}
                        label="I'm ready"
                        onPress={onNext}
                        style={{marginBottom: 20}}
                    />
                    <Button
                        label="Back"
                        onPress={onBack}
                        style={{
                            backgroundColor: color.blue,
                            borderColor: color.blue,
                        }}
                        textStyle={{
                            color: color.white
                        }}
                    />
                </View>
            </View>
        );
    }
}
