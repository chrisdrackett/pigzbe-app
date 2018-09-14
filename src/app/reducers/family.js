import valueOrDefault from '../utils/value-or-default';
import {
    FAMILY_LOADING,
    FAMILY_LOAD,
    FAMILY_PARENT_NICKNAME,
    FAMILY_NUM_KIDS_TO_ADD,
    FAMILY_ADD_KID,
    FAMILY_BALANCE_UPDATE,
    FAMILY_ASSIGN_TASK,
    FAMILY_COMPLETE_TASK,
    FAMILY_ADD_ALLOWANCE,
    FAMILY_DELETE_ALLOWANCE,
    FAMILY_DELETE_TASK
} from '../actions';

export const initialState = {
    loading: false,
    parentNickname: '',
    numKidsToAdd: 0,
    numKidsAdded: 0,
    kids: [],
};

export default (state = initialState, action) => {
    console.log('+++ state', state.kids);

    switch (action.type) {
        case FAMILY_LOADING:
            return {
                ...state,
                loading: action.value
            };
        case FAMILY_LOAD:
            return Object.keys(initialState)
                .filter(key => key !== 'loading')
                .reduce((ob, key) => {
                    ob[key] = valueOrDefault(action[key], state[key]);
                    return ob;
                }, {});
        case FAMILY_PARENT_NICKNAME:
            return {
                ...state,
                parentNickname: action.parentNickname,
            };
        case FAMILY_NUM_KIDS_TO_ADD:
            return {
                ...state,
                numKidsToAdd: action.numKidsToAdd,
                numKidsAdded: 0,
            };
        case FAMILY_ADD_KID:
            return {
                ...state,
                kids: state.kids.concat({...action.kid, tasks: []}),
                numKidsToAdd: state.numKidsToAdd - 1,
                numKidsAdded: state.numKidsAdded + 1,
            };
        case FAMILY_BALANCE_UPDATE:
            return {
                ...state,
                kids: state.kids.map(k => {
                    if (k.address === action.address) {
                        return {
                            ...k,
                            balance: action.balance
                        };
                    }
                    return k;
                }),
            };
        case FAMILY_ASSIGN_TASK:
            console.log('REDUCER FAMILY_ASSIGN_TASK', action.data);
            return {
                ...state,
                kids: state.kids.map(k => {
                    if (k.address === action.data.kid.address) {
                        return {
                            ...k,
                            tasks: k.tasks.concat({...action.data}),
                        };
                    }
                    return k;
                }),
            };
        case FAMILY_COMPLETE_TASK:
            return {
                ...state,
                kids: state.kids.map(k => {
                    if (k.address === action.data.kid.address) {
                        return {
                            ...k,
                            tasks: k.tasks.filter(t => t.transaction !== action.data.task.transaction),
                        };
                    }
                    return k;
                }),
            };
        case FAMILY_DELETE_TASK:
            console.log('REDUCER FAMILY_DELETE_TASK', action.data);
            return {
                ...state,
                kids: state.kids.map(k => {
                    if (k.name === action.data.name) {
                        console.log('task.task', k.tasks, 'action.data.task', action.data.task);
                        console.log('filtered tasks:', k.tasks.filter(task => {
                            return task.task !== action.data.task;
                        }));
                        return {
                            ...k,
                            tasks: k.tasks.filter(task => {
                                return task.task !== action.data.task;
                            }),
                        };
                    }
                    return k;
                }),
            };
        case FAMILY_ADD_ALLOWANCE:
            return {
                ...state,
                kids: state.kids.map(k => {
                    // if no child name is passed the assign tasks to all kids
                    // this is the case when part of the initial add children process
                    // otherwise compare to kid name
                    if (action.data.name === null || k.name === action.data.name) {
                        return {
                            ...k,
                            allowance: {amount: action.data.allowance, interval: action.data.interval, day: action.data.day},
                        };
                    }
                    return k;
                }),
            };
        case FAMILY_DELETE_ALLOWANCE:
            return {
                ...state,
                kids: state.kids.map(k => {
                    // if no child name is passed the assign tasks to all kids
                    // this is the case when part of the initial add children process
                    // otherwise compare to kid name
                    if (k.name === action.data.name) {
                        return {
                            ...k,
                            allowance: null,
                        };
                    }
                    return k;
                }),
            };
        default:
            return state;
    }
};
