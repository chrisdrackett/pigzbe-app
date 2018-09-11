import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, TouchableOpacity, Text, Dimensions} from 'react-native';
import Button from '../../components/button';
import {SCREEN_BALANCE, SCREEN_TASKS_ASSIGN} from '../../constants';
import StepModule from '../../components/step-module';
import TextInput from '../../components/text-input';
import Toggle from '../../components/toggle';
import {color} from '../../styles';
// import {tasksAddTask, loadTasks} from '../../actions';

const buttonStyle = {
    background: 'transparent',
    border: color.blue,
    fontSize: 14,
    paddingTop: 10,
    height: Dimensions.get('window').width / 8,
    lineHeight: Dimensions.get('window').width / 8,
    marginBottom: 20,
    width: Dimensions.get('window').width / 8,
    marginLeft: Dimensions.get('window').width / 50,
    marginRight: Dimensions.get('window').width / 50,
    textAlign: 'center',
};

const textInput = {
    backgroundColor: color.pink,
    borderColor: color.pink,
    fontSize: 14,
    marginTop: 10,
    height: Dimensions.get('window').width / 8,
    lineHeight: Dimensions.get('window').width / 8,
    marginBottom: 20,
    width: Dimensions.get('window').width / 4 + Dimensions.get('window').width / 50,
    marginLeft: Dimensions.get('window').width / 50,
    marginRight: Dimensions.get('window').width / 50,
    textAlign: 'left',
    borderRadius: Dimensions.get('window').width / 12,
};

const innerStyle = {
    borderRadius: Dimensions.get('window').width / 16,
    lineHeight: Dimensions.get('window').width / 8,
    display: 'flex',
    borderWidth: 1,
    alignContent: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').width / 8,
    textAlign: 'center',
};

const innerTextStyle = {
    backgroundColor: color.white,
    borderColor: color.mediumBlue,
    color: color.mediumBlue,
};

const cancelStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBottomWidth: 1,
    borderBottomColor: color.blue,
};

const cancelInner = {
    color: color.blue,
    fontSize: 14,
};

const flexStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
};

const toggleList = {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
    // marginBottom: 10
};

export class Allowance extends Component {
    state = {
        loading: false,
        showingInput: false,
        allowances: [25, 50, 75, 100, 125, 150],
        active: null,
        custom: null,
    }

    componentWillMount() {
    }

    getAllowancesList = () => {
        const deconstructedAllowances = this.props.allowances.map(allowance => ({
            key: allowance,
        }));

        deconstructedAllowances.push({key: '+'});

        console.log('deconstructedAllowances', deconstructedAllowances);

        return deconstructedAllowances;
    }

    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE);

    onChangeText = (allowance) => {
        this.setState({custom: allowance});
    }

    showInput = () => {
        this.setState({showingInput: true, active: null});
        // setTimeout(() => {
        //     this.inputBox.focus();
        // }, 0);
    }

    cancelInput = () => this.setState({showingInput: false, newTask: null});

    renderElement = item => {
        const {showingInput, active} = this.state;

        console.log('toggle', item.key, showingInput, active);

        if (item.key === '+' && !showingInput) {
            return (
                <TouchableOpacity
                    onPress={this.showInput}
                    style={buttonStyle}
                >
                    <Text
                        style={[innerStyle, innerTextStyle]}
                    >
                        {item.key}
                    </Text>
                </TouchableOpacity>);

        } else if (item.key === '+' && showingInput) {
            return (
                <TextInput
                    numberOfLines={1}
                    onChangeText={this.onChangeText}
                    returnKeyType="done"
                    style={textInput}
                    autoFocus
                />);
        }

        return (<Toggle
            style={buttonStyle}
            innerStyle={innerStyle}
            label={item.key}
            onPress={() => {
                this.setState({
                    active: item.key,
                    showingInput: false,
                });
            }}
            active={active === item.key}
        />);

    }

    next = async () => {
        const {custom, active} = this.state;

        this.props.navigation.navigate(SCREEN_TASKS_ASSIGN, {kid: this.props.kid, task: custom ? custom : active});
    }

    render() {
        const {showingInput, active, custom} = this.state;
        const {loading} = this.props;

        return (
            <StepModule
                title="Regular Allowance"
                icon="family"
                content={'Please choose a task from below list'}
                pad
                loading={loading}
                onBack={this.onBack}
            >
                <View style={flexStyle}>
                    <View>
                        <View style={toggleList}>
                            <FlatList
                                style={{marginBottom: 10}}
                                data={
                                    this.getAllowancesList()
                                }
                                contentContainerStyle={toggleList}
                                renderItem={({item}) => this.renderElement(item)}
                            />
                        </View>
                    </View>
                    <View style={{marginTop: 20}}>
                        {
                            <Button
                                label={'Next'}
                                onPress={this.next}
                                disabled={showingInput && !custom || !showingInput && !active}
                            />
                        }
                    </View>
                </View>
            </StepModule>
        );
    }
}

export default connect(
    (state, props) => ({
        allowances: state.tasks.tasks,
        loading: state.tasks.loading,
        kid: props.navigation.state.params.kid,
    })
)(Allowance);
