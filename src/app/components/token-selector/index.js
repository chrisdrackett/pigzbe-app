import React, {Component, Fragment} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import * as Animatable from 'react-native-animatable';

const tokens = [{
    name: 'Stellar (XLM)',
}, {
    name: 'Wollo (WLO)',
}];

class TokenButton extends Component {
    onSelect = () => this.props.onSelect(this.props.token.name)

    render() {
        return (
            <TouchableOpacity key={this.props.token.name} onPress={this.onSelect}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{this.props.token.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default class TokenSelector extends Component {
    state = {
        toggled: false,
        open: false,
        selectedToken: tokens[0],
    }

    onToggle = () => this.setState({open: !this.state.open, toggled: true})

    onClose = () => this.setState({open: false})

    onSelect = tokenName => {
        this.setState({
            selectedToken: tokens.find(t => t.name === tokenName),
            open: false,
        });
    }

    render() {
        return (
            <Fragment>
                {this.state.toggled && (
                    <Animatable.View
                        animation={this.state.open ? 'slideInDown' : 'slideOutUp'}
                        duration={800}
                        style={styles.container}>
                        <Text style={styles.title}>SELECT YOUR WALLET</Text>
                        <View>
                            {tokens.map(t => (
                                <TokenButton key={t.name} token={t} onSelect={this.onSelect} />
                            ))}
                        </View>
                    </Animatable.View>
                )}
                <View style={styles.toggleContainer}>
                    <TouchableOpacity onPress={this.onToggle}>
                        <View style={styles.toggleButton}>
                            <Text style={styles.buttonText}>{this.state.selectedToken.name}</Text>
                            <Image
                                style={[styles.chevron, this.state.open ? styles.chevronUp : null]}
                                source={require('./images/chevron.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </Fragment>
        );
    }
}
