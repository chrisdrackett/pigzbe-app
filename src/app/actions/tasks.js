import Storage from '../utils/storage';
import {STORAGE_KEY_TASKS} from '../constants';

export const TASKS_LOADING = 'TASKS_LOADING';
export const TASKS_LOAD = 'TASKS_LOAD';
export const TASKS_ADD_TASK = 'TASKS_ADD_TASK';

const tasksLoading = value => ({type: TASKS_LOADING, value});

export const loadTasks = () => async dispatch => {
    try {
        const data = await Storage.load(STORAGE_KEY_TASKS);
        await dispatch({type: TASKS_LOAD, ...data});
    } catch (error) {
        console.log(error);
    }
};

export const saveTask = () => async (dispatch, getState) => {
    try {
        const data = getState().tasks;
        await Storage.save(STORAGE_KEY_TASKS, data);
    } catch (error) {
        console.log(error);
    }
};

export const tasksAddTask = (task) => async dispatch => {
    // dispatch(tasksLoading(true));

    dispatch(({type: TASKS_ADD_TASK, task: task}));
    await dispatch(saveTask());
    dispatch(tasksLoading(false));
};
