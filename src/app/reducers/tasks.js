import {
    TASKS_LOADING_CUSTOM,
    TASKS_LOAD_CUSTOM,
    TASKS_ADD_CUSTOM,
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
        case TASKS_LOADING_CUSTOM:
            return {
                ...state,
                loading: action.value
            };
        case TASKS_LOAD_CUSTOM:
            return {
                ...state,
                tasks: action.value
            };
        case TASKS_ADD_CUSTOM:
            return {
                ...state,
                tasks: [action.task].concat(state.tasks),
            };
        default:
            return state;
    }
};
