import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TouchableOpacity, Text, Image, TextInput} from 'react-native';
import Button from '../../components/button';
import {SCREEN_DASHBOARD, SCREEN_ALLOWANCE_INTERVAL} from '../../constants';
import {appAddWarningAlert} from '../../actions';
import StepModule from '../../components/step-module';
import Toggle from '../../components/toggle';
import {CURRENCIES} from '../../constants';
import moneyFormat from '../../utils/money-format';
import styles from './styles';

const amounts = ['25', '50', '75', '100', '125', '150'];

const getActive = edit => edit && amounts.includes(edit.amount) ? edit.amount : null;

const getCustom = edit => edit && !amounts.includes(edit.amount) ? edit.amount : null;

export class AllowanceAmount extends Component {
    state = {
        loading: false,
        showingInput: false,
        amounts,
        // what if custom?
        active: getActive(this.props.allowanceToEdit),
        custom: getCustom(this.props.allowanceToEdit),
    }

    componentWillMount() {
        console.log('++++ this.props.allowanceToEdit', this.props.allowanceToEdit);
    }

    componentDidMount() {
        if (this.state.custom) {
            this.showInput();
        }
    }

    getAllowancesList = () => {
        const deconstructedAllowances = this.state.amounts.map(amount => ({
            key: amount,
        }));

        deconstructedAllowances.push({key: '+'});

        return deconstructedAllowances;
    }

    onBack = () => this.props.navigation.goBack();

    onChangeCustom = custom => this.setState({custom})

    showInput = () => this.setState({
        showingInput: true,
        active: null
    }, () => this.inputBox.focus())

    deleteCustom = () => this.setState({showingInput: false, custom: null})

    cancelInput = () => this.setState({showingInput: false, newTask: null});

    renderElement = item => {
        const {showingInput, active} = this.state;

        if (item.key === '+' && !showingInput) {
            return (
                <View style={styles.wrapper}>
                    <TouchableOpacity
                        onPress={this.showInput}
                        style={styles.button}
                    >
                        <Text
                            style={[styles.inner, styles.innerText]}
                        >
                            {item.key.toString()}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.conversion}>Custom</Text>
                </View>);

        } else if (item.key === '+' && showingInput) {
            return (
                <View style={styles.wrapper}>
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            ref={el => (this.inputBox = el)}
                            style={styles.textInput}
                            value={this.state.custom || ''}
                            numberOfLines={1}
                            maxLength={4}
                            keyboardType="numeric"
                            returnKeyType="done"
                            onChangeText={this.onChangeCustom}
                        />
                        <TouchableOpacity style={styles.cancel} onPress={this.deleteCustom}>
                            <Image style={styles.cancelImage} source={require('./images/iconCrossBlue.png')}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.conversion}>Custom</Text>
                </View>);
        }

        const currency = CURRENCIES[this.props.baseCurrency];
        const exchangedValue = item.key * this.props.exchange[this.props.baseCurrency];

        return (
            <View style={styles.wrapper}>
                <Toggle
                    style={styles.button}
                    innerStyle={styles.inner}
                    label={item.key}
                    onPress={() => this.setState({
                        active: item.key,
                        custom: null,
                        showingInput: false,
                    })}
                    active={active === item.key}
                />
                <Text style={styles.conversion}>{`${currency.symbol}${moneyFormat(exchangedValue, currency.dps)}`}</Text>
            </View>
        );

    }

    next = async () => {
        const {custom, active} = this.state;
        const {balances} = this.props;
        const amount = custom ? custom : active;

        if (parseFloat(balances.WLO) < parseFloat(amount)) {
            this.props.dispatch(appAddWarningAlert('You don\'t have enough funds. Allowance payments will fail until there are enough funds'));
        }

        this.props.navigation.push(SCREEN_ALLOWANCE_INTERVAL, {
            kid: this.props.kid,
            amount,
            allowanceToEdit: this.props.allowanceToEdit || null,
        });
    }

    skip = async () => {
        this.props.navigation.push(SCREEN_DASHBOARD);
    }

    render() {
        const {showingInput, active, custom} = this.state;
        const {loading, fromAddKids} = this.props;

        return (
            <StepModule
                title="Regular Allowance"
                icon="allowance"
                content="Tell us the value of this regular Wollo allowance"
                pad
                loading={loading}
                onBack={fromAddKids ? null : this.onBack}
                keyboardOffset={-180}
            >
                <View style={styles.flex}>
                    <View>
                        <View style={styles.toggleList}>
                            {this.getAllowancesList().map((item, index) =>
                                (<View key={index}>
                                    {this.renderElement(item)}
                                </View>)
                            )}
                        </View>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Button
                            label={'Next'}
                            onPress={this.next}
                            disabled={showingInput && !custom || !showingInput && !active}
                        />
                        <Button
                            label={'Skip for now'}
                            onPress={this.skip}
                        />
                    </View>
                </View>
            </StepModule>
        );
    }
}

export default connect(
    (state, props) => ({
        loading: false, /*state.kids.loading,*/
        kid: props.navigation.state.params.kid,
        baseCurrency: state.settings.baseCurrency,
        exchange: state.exchange.exchange,
        allowanceToEdit: props.navigation.state.params.allowanceToEdit,
        fromAddKids: props.navigation.state.params.fromAddKids,
        balances: state.wallet.balances,
    })
)(AllowanceAmount);
