import {
    TASKS_LOADING,
    TASKS_LOAD,
    TASKS_ADD_TASK,
} from '../actions';

const defaultTasks = [
    'Clean the car',
    'Tidy your room',
    'Do your homework',
    'Take out the rubbish',
    'Wash the dishes'
];

export const initialState = {
    loading: false,
    tasks: [],
    defaultTasks,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TASKS_LOADING:
            return {
                ...state,
                loading: action.value
            };
        case TASKS_LOAD:
            return {
                ...state,
                tasks: action.value
            };
        case TASKS_ADD_TASK:
            return {
                ...state,
                tasks: [action.task].concat(state.tasks),
            };
        default:
            return state;
    }
};
