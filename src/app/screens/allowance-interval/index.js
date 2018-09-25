import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import moment from 'moment';
import Button from '../../components/button';
import SelectInput from '../../components/select-input';
import {SCREEN_DASHBOARD, SCREEN_ALLOWANCE_AMOUNT, SCREEN_KID_DASHBOARD} from '../../constants';
import StepModule from '../../components/step-module';
import styles from './styles';
import {addAllowance} from '../../actions';
import DeviceInfo from 'react-native-device-info';


export class AllowanceInterval extends Component {
    state = {
        day: null,
        interval: null,
        intervals: ['Daily', 'Weekly', 'Fortnightly', 'Monthly'],
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        monthly: ['1st', '15th'],
        nextDate: null,
        timezone: DeviceInfo.getTimezone(),
    }

    componentWillMount() {
    }

    onBack = () => this.props.navigation.navigate(SCREEN_ALLOWANCE_AMOUNT, {kid: this.props.kid});

    next = async () => {
        const {day, interval, nextDate, timezone} = this.state;
        const {kid, amount} = this.props;

        await this.props.dispatch(addAllowance(kid, amount, interval, day, nextDate, timezone));

        // todo navigate to kid screen instead
        if (kid) {
            this.props.navigation.navigate(SCREEN_KID_DASHBOARD, {kid});
        } else {
            this.props.navigation.navigate(SCREEN_DASHBOARD, {kid});
        }
    }

    getNextPaymentInfo = () => {
        const {interval, day, days} = this.state;

        console.log('++ interval', interval);

        if (interval === 'Weekly' || interval === 'Fortnightly') {
            const dayNeeded = days.indexOf(day) + 1; // for Thursday
            console.log('day in need', days, dayNeeded);
            const today = moment().isoWeekday();

            // if we haven't yet passed the day of the week that I need:
            if (today <= dayNeeded) {
                // then just give me this week's instance of that day
                return moment().isoWeekday(dayNeeded);
            } else {
                // otherwise, give me *next week's* instance of that same day
                return moment().add(1, 'weeks').isoWeekday(dayNeeded);
            }
        } else if (interval === 'Daily') {
            return moment();
        } else { // interval is monthly
            if (moment().date() === 1 && day === '1st' || moment().date() === 15 && day === '15st') {
                return moment();
            } else {
                if (day === '1st') {
                    return moment().add(1, 'month').date(1);
                } else if (moment().date() < 15 && day === '15th') {
                    return moment().date(15);
                }
                return moment().add(1, 'month').date(15);
            }
        }
    }

    setNextPaymentDate = () => {
        const nextDate = this.getNextPaymentInfo();
        console.log('nextDate:', nextDate);
        this.setState({nextDate});
    }

    changeInterval(interval) {
        this.setState({interval, day: null});
        setTimeout(this.setNextPaymentDate, 0);
    }

    changeDay(day) {
        this.setState({day});
        setTimeout(this.setNextPaymentDate, 0);
    }

    render() {
        const {interval, day, intervals, days, monthly, nextDate, timezone} = this.state;
        const {loading} = this.props;

        const dayOptions = interval === 'Monthly' ? monthly : days;
        const showSecondInput = interval !== 'Daily';
        const disabled = !(day && interval || interval === 'Daily');

        return (
            <StepModule
                title="Regular Allowance"
                icon="allowance"
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
                            onChangeSelection={value => this.changeInterval(value)}
                            options={intervals}
                        />
                        {showSecondInput && <SelectInput
                            value={day}
                            placeholder={'Which day'}
                            onChangeSelection={value => this.changeDay(value)}
                            options={dayOptions}
                        />}
                        {!disabled && nextDate && <Text style={styles.text}>First Allowance:{'\n'}{nextDate.format('dddd, MMMM Do')}</Text>}
                        {DeviceInfo && <Text style={styles.text}>Your Timezone:{'\n'}{timezone}</Text>}
                    </View>
                    <View style={{marginTop: 20}}>
                        <Button
                            label={'Complete'}
                            onPress={this.next}
                            disabled={disabled}
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
        amount: props.navigation.state.params.amount,
        kid: props.navigation.state.params.kid,
    })
)(AllowanceInterval);
