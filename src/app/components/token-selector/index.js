import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
// import * as Animatable from 'react-native-animatable';
import ReactModal from 'react-native-modal';
import {setSelectedToken} from 'app/actions';
import CoinIcon from 'app/components/coin-icon';
import {CURRENCIES} from 'app/constants';

const tokens = ['WLO', 'XLM'];

class Toggle extends Component {
    onToggle = () => this.props.onToggle()

    render() {
        return (
            <View style={styles.toggleContainer}>
                <TouchableOpacity onPress={this.onToggle}>
                    <View style={styles.toggleButton}>
                        <Text style={styles.buttonText}>
                            {CURRENCIES[this.props.token].name} ({this.props.token})
                        </Text>
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
    onSelect = () => this.props.onSelect(this.props.token)

    render() {
        return (
            <TouchableOpacity onPress={this.onSelect}>
                <View style={styles.button}>
                    <CoinIcon coin={this.props.token} style={styles.buttonIcon} small light />
                    <Text style={styles.buttonText}>
                        {CURRENCIES[this.props.token].name} ({this.props.token})
                    </Text>
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
                            token={this.props.selectedToken}
                            open={this.state.open}
                        />
                        <Text style={styles.title}>SELECT YOUR WALLET</Text>
                        <View>
                            {tokens.map(token => (
                                <TokenButton
                                    key={token}
                                    token={token}
                                    onSelect={this.onSelect}
                                />
                            ))}
                        </View>
                    </View>
                </ReactModal>
                <Toggle
                    onToggle={this.onToggle}
                    token={this.props.selectedToken}
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
