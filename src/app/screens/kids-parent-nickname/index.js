import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Toggle from '../../components/toggle';
import {SCREEN_KIDS_NUMBER_TO_ADD} from '../../constants';
import StepModule from '../../components/step-module';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
import {setParentNickname} from '../../actions';
import styles from './styles';

export class KidsParentNickname extends Component {
    state = {
        loading: false,
        type: null,
    }

    onBack = () => this.props.navigation.goBack()

    onNext = async () => {
        this.setState({loading: true});
        await this.props.dispatch(setParentNickname(this.state.type === 'custom' ? this.state.custom : this.state.type));
        this.props.navigation.push(SCREEN_KIDS_NUMBER_TO_ADD);
    }

    onChangeText = (text) => {
        this.setState({type: text.length > 0 ? 'custom' : null});
        this.setState({custom: text});
    }

    render() {
        return (
            <StepModule
                title="Describe yourself"
                icon="family"
                content={'What are you called by your children?'}
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
                        label={'Dad'}
                        onPress={() => {
                            this.setState({type: 'dad', custom: null});
                        }}
                        active={this.state.type === 'dad'}
                    />
                    <Toggle
                        style={styles.buttonStyle}
                        innerStyle={styles.innerStyle}
                        label={'Mum'}
                        onPress={() => {
                            this.setState({type: 'mum', custom: null});
                        }}
                        active={this.state.type === 'mum'}
                    />
                </View>
                <TextInput
                    // error={badAddress}
                    value={this.state.custom}
                    numberOfLines={1}
                    placeholder="Other"
                    onChangeText={this.onChangeText}
                    returnKeyType="done"
                />
                <Button
                    label={'Next'}
                    disabled={this.state.type === null}
                    onPress={this.onNext}
                />
            </StepModule>
        );
    }
}

export default connect()(KidsParentNickname);
