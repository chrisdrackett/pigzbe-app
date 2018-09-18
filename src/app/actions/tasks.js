import Storage from '../utils/storage';
import {STORAGE_KEY_TASKS} from '../constants';

export const TASKS_LOADING_CUSTOM = 'TASKS_LOADING_CUSTOM';
export const TASKS_LOAD_CUSTOM = 'TASKS_LOAD_CUSTOM';
export const TASKS_ADD_CUSTOM = 'TASKS_ADD_CUSTOM';

const tasksLoading = value => ({type: TASKS_LOADING_CUSTOM, value});

export const loadCustomTasks = () => async dispatch => {
    try {
        const data = await Storage.load(STORAGE_KEY_TASKS);
        const value = data && Array.isArray(data) ? data : [];
        await dispatch({type: TASKS_LOAD_CUSTOM, value});
    } catch (error) {
        console.log(error);
    }
};

export const saveCustomTasks = () => async (dispatch, getState) => {
    try {
        const data = getState().tasks.tasks;
        await Storage.save(STORAGE_KEY_TASKS, data);
    } catch (error) {
        console.log(error);
    }
};

export const addCustomTask = (task) => async dispatch => {
    dispatch(tasksLoading(true));

    dispatch(({type: TASKS_ADD_CUSTOM, task: task}));
    await dispatch(saveCustomTasks());
    dispatch(tasksLoading(false));
};
