import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Button from '../../components/button';
import SelectInput from '../../components/select-input';
import {SCREEN_BALANCE, SCREEN_ALLOWANCE_AMOUNT, SCREEN_CHILD_DASH} from '../../constants';
import StepModule from '../../components/step-module';
import styles from './styles';
import {familyAddAllowance} from '../../actions';


export class AllowanceInterval extends Component {
    state = {
        day: null,
        interval: null,
        intervals: ['Daily', 'Weekly', 'Fortnightly', 'Monthly'],
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    }

    componentWillMount() {
    }

    onBack = () => this.props.navigation.navigate(SCREEN_ALLOWANCE_AMOUNT, {kid: this.props.kid});

    next = async () => {
        const {day, interval} = this.state;
        const {kid, amount} = this.props;

        await this.props.dispatch(familyAddAllowance(kid, amount, interval, day));

        // todo navigate to kid screen instead
        if (kid) {
            this.props.navigation.navigate(SCREEN_CHILD_DASH, {kid});
        } else {
            this.props.navigation.navigate(SCREEN_BALANCE, {kid});
        }
    }

    render() {
        const {interval, day, intervals, days} = this.state;
        const {loading} = this.props;

        return (
            <StepModule
                title="Regular Allowance"
                icon="family"
                content={'How often would you like the allowance to be sent?'}
                pad
                loading={loading}
                onBack={this.onBack}
                keyboardOffset={-180}
            >
                <View style={styles.flex}>
                    <View>
                        <SelectInput
                            value={interval}
                            placeholder={'How often?'}
                            onChangeSelection={value => this.setState({interval: value})}
                            options={intervals}
                        />
                        <SelectInput
                            value={day}
                            placeholder={'Which day'}
                            onChangeSelection={value => this.setState({day: value})}
                            options={days}
                        />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Button
                            label={'Complete'}
                            onPress={this.next}
                            disabled={!day || !interval}
                        />
                    </View>
                </View>
            </StepModule>
        );
    }
}

export default connect(
    (state, props) => ({
        loading: false, /*state.family.loading,*/
        amount: props.navigation.state.params.amount,
        kid: props.navigation.state.params.kid,
    })
)(AllowanceInterval);
