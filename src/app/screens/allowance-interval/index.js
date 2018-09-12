import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Button from '../../components/button';
import SelectInput from '../../components/select-input';
import {SCREEN_BALANCE} from '../../constants';
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

    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE);

    next = async () => {
        const {day, interval} = this.state;
        const {kid, allowance} = this.props;

        console.log('NEXT', day, interval, kid, allowance);

        await this.props.dispatch(familyAddAllowance(kid, allowance, interval, day));

        // todo navigate to kids screen instead
        this.props.navigation.navigate(SCREEN_BALANCE);


        // todo save to redux state and redirect
        // this.props.navigation.navigate(SCREEN_BALANCE, {kid: this.props.kid, allowance: custom ? custom : active});
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
        allowance: props.navigation.state.params.allowance,
        kid: props.navigation.state.params.kid.name,
    })
)(AllowanceInterval);
