import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Toggle from '../../components/toggle';
import {SCREEN_KIDS_ENTER_PROFILE, MIN_BALANCE, MIN_BALANCE_XLM_ADD_KID} from '../../constants';
import StepModule from '../../components/step-module';
import Button from '../../components/button';
import {setNumKidsToAdd} from '../../actions';
import styles from './styles';
import BigNumber from 'bignumber.js';

export class KidsNumberToAdd extends Component {
    state = {
        loading: false,
        type: null,
    }

    onBack = () => this.props.navigation.goBack()

    onNext = async () => {
        this.setState({loading: true});
        await this.props.dispatch(setNumKidsToAdd(this.state.type));
        this.props.navigation.push(SCREEN_KIDS_ENTER_PROFILE);
    }

    componentDidMount() {
        if (this.props.navigation) {
            this.focusListener = this.props.navigation.addListener('didFocus', () => this.setState({loading: false}));
        }
    }

    componentWillUnMount() {
        if (this.focusListener) {
            this.focusListener.remove();
        }
    }

    render() {

        const numCanAdd = new BigNumber(this.props.balances.XLM)
            .minus(MIN_BALANCE)
            .dividedToIntegerBy(MIN_BALANCE_XLM_ADD_KID);

        console.log('numCanAdd', numCanAdd.toString(10));

        return (
            <StepModule
                title="Your children"
                icon="family"
                content={'How many children would you like to add?'}
                pad
                loading={this.state.loading}
                onBack={this.onBack}
            >
                <View
                    style={styles.flexStyle}
                >
                    <Toggle
                        style={styles.buttonStyle}
                        innerStyle={styles.innerStyle}
                        label={'1'}
                        onPress={() => {
                            this.setState({type: 1});
                        }}
                        active={this.state.type === 1}
                    />
                    <Toggle
                        disabled={numCanAdd.isLessThan(2)}
                        style={styles.buttonStyle}
                        innerStyle={styles.innerStyle}
                        label={'2'}
                        onPress={() => {
                            this.setState({type: 2});
                        }}
                        active={this.state.type === 2}
                    />
                    <Toggle
                        disabled={numCanAdd.isLessThan(3)}
                        style={styles.buttonStyle}
                        innerStyle={styles.innerStyle}
                        label={'3'}
                        onPress={() => {
                            this.setState({type: 3});
                        }}
                        active={this.state.type === 3}
                    />
                    <Toggle
                        disabled={numCanAdd.isLessThan(4)}
                        style={styles.buttonStyle}
                        innerStyle={styles.innerStyle}
                        label={'4'}
                        onPress={() => {
                            this.setState({type: 4});
                        }}
                        active={this.state.type === 4}
                    />
                </View>
                <Button
                    label={'Next'}
                    disabled={this.state.type === null}
                    onPress={this.onNext}
                />
            </StepModule>
        );
    }
}

export default connect(
    state => ({
        balances: state.wallet.balances,
    })
)(KidsNumberToAdd);
