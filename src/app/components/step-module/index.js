import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Header from '../../components/header';
import StepHeader from '../../components/step-header';
import Container from '../../components/container';
import KeyboardAvoid from '../../components/keyboard-avoid';
import styles from './styles';

export default class extends Component {
    render() {
        const {
            title,
            icon,
            tagline,
            error,
            children,
        } = this.props;

        return (
            <Container>
                <KeyboardAvoid>
                    <Header/>
                    <StepHeader title={title} icon={icon}/>
                    <Container white scroll>
                        <View style={styles.containerText}>
                            <Text style={styles.subtitle}>{tagline}</Text>
                            {error && (
                                <Text style={styles.subtitle}>{error.message}</Text>
                            )}
                        </View>
                        <View style={styles.containerBody}>
                            {children}
                        </View>
                    </Container>
                </KeyboardAvoid>
            </Container>
        );
    }
}
