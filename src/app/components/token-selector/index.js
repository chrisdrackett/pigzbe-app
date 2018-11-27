import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
// import * as Animatable from 'react-native-animatable';
import ReactModal from 'react-native-modal';
import {setSelectedToken} from 'app/actions';

const tokens = {
    WLO: {
        name: 'Wollo (WLO)',
        code: 'WLO',
        icon: require('./images/wlo.png'),
    },
    XLM: {
        name: 'Stellar (XLM)',
        code: 'XLM',
        icon: require('./images/xlm.png'),
    }};

class Toggle extends Component {
    onToggle = () => this.props.onToggle()

    render() {
        return (
            <View style={styles.toggleContainer}>
                <TouchableOpacity onPress={this.onToggle}>
                    <View style={styles.toggleButton}>
                        <Text style={styles.buttonText}>{tokens[this.props.selectedToken].name}</Text>
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
    onSelect = () => this.props.onSelect(this.props.token.code)

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

export class TokenSelector extends Component {
    state = {
        open: false,
    }

    onToggle = () => this.setState({open: !this.state.open})

    onClose = () => this.setState({open: false})

    onSelect = tokenCode => {
        this.setState({open: false});
        this.props.dispatch(setSelectedToken(tokenCode));
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
                            selectedToken={this.props.selectedToken}
                            open={this.state.open}
                        />
                        <Text style={styles.title}>SELECT YOUR WALLET</Text>
                        <View>
                            {Object.keys(tokens).map(key => (
                                <TokenButton
                                    key={tokens[key].name}
                                    token={tokens[key]}
                                    onSelect={this.onSelect}
                                />
                            ))}
                        </View>
                    </View>
                </ReactModal>
                <Toggle
                    onToggle={this.onToggle}
                    selectedToken={this.props.selectedToken}
                    open={this.state.open}
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        selectedToken: state.wallet.selectedToken
    })
)(TokenSelector);
