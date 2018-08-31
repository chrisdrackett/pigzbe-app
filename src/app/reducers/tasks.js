import valueOrDefault from '../utils/value-or-default';
import {
    TASKS_LOADING,
    TASKS_LOAD,
    TASKS_ADD_TASK
} from '../actions';

export const initialState = {
    loading: false,
    tasks: ['task 1', 'task 2'],
};

export default (state = initialState, action) => {
    console.log('>>>> tasks reducer <<<<');

    switch (action.type) {
        case TASKS_LOADING:
            return {
                ...state,
                loading: action.value
            };
        case TASKS_LOAD:
            return Object.keys(initialState).reduce((ob, key) => {
                ob[key] = valueOrDefault(action[key], state[key]);
                return ob;
            }, {});
        case TASKS_ADD_TASK:
            console.log('++++ TASKS_ADD_TASK', action);
            return {
                ...state,
                tasks: state.tasks.concat(action.task),
            };
        default:
            return state;
    }
};
