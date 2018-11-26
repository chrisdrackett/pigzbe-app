import React, {Component, Fragment} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
// import * as Animatable from 'react-native-animatable';
import ReactModal from 'react-native-modal';

const tokens = [{
    name: 'Wollo (WLO)',
    icon: require('./images/wlo.png'),
}, {
    name: 'Stellar (XLM)',
    icon: require('./images/xlm.png'),
}];

class Toggle extends Component {
    onToggle = () => this.props.onToggle()

    render() {
        return (
            <View style={styles.toggleContainer}>
                <TouchableOpacity onPress={this.onToggle}>
                    <View style={styles.toggleButton}>
                        <Text style={styles.buttonText}>{this.props.selectedToken.name}</Text>
                        <Image
                            style={[styles.chevron, this.props.open ? styles.chevronUp : null]}
                            source={require('./images/chevron.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

class TokenButton extends Component {
    onSelect = () => this.props.onSelect(this.props.token.name)

    render() {
        return (
            <TouchableOpacity key={this.props.token.name} onPress={this.onSelect}>
                <View style={styles.button}>
                    <Image style={styles.buttonIcon} source={this.props.token.icon} />
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

    // onToggle = () => this.setState({open: !this.state.open, toggled: true})
    onToggle = () => this.setState({open: !this.state.open})

    onClose = () => this.setState({open: false})

    onSelect = tokenName => {
        this.setState({
            selectedToken: tokens.find(t => t.name === tokenName),
            open: false,
        });
    }

    // {this.state.toggled && (
    //     <Animatable.View
    //         animation={this.state.open ? 'slideInDown' : 'slideOutUp'}
    //         duration={800}
    //         style={styles.container}>
    //         <Text style={styles.title}>SELECT YOUR WALLET</Text>
    //         <View>
    //             {tokens.map(t => (
    //                 <TokenButton key={t.name} token={t} onSelect={this.onSelect} />
    //             ))}
    //         </View>
    //     </Animatable.View>
    // )}

    render() {
        return (
            <Fragment>
                <ReactModal
                    isVisible={this.state.open}
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    style={{margin: 0}}
                >
                    <View style={styles.container}>
                        <Toggle
                            onToggle={this.onToggle}
                            selectedToken={this.state.selectedToken}
                            open={this.state.open}
                        />
                        <Text style={styles.title}>SELECT YOUR WALLET</Text>
                        <View>
                            {tokens.map(t => (
                                <TokenButton
                                    key={t.name}
                                    token={t}
                                    onSelect={this.onSelect}
                                />
                            ))}
                        </View>
                    </View>
                </ReactModal>
                <Toggle
                    onToggle={this.onToggle}
                    selectedToken={this.state.selectedToken}
                    open={this.state.open}
                />
            </Fragment>
        );
    }
}
