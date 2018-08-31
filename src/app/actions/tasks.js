import Storage from '../utils/storage';
import {STORAGE_KEY_TASKS} from '../constants';
// import {createSubAccount, getAccountBalance, sendWollo} from './';

export const TASKS_LOADING = 'TASKS_LOADING';
export const TASKS_LOAD = 'TASKS_LOAD';
export const TASKS_ADD_TASK = 'TASK_ADD_TASK';

const tasksLoading = value => ({type: TASKS_LOADING, value});

// const familySending = value => ({type: FAMILY_SENDING, value});

export const loadTasks = () => async dispatch => {
    console.log('--> loadTasks');
    try {
        // const {secretKey} = getState().wollo;
        // const data = await Storage.load(STORAGE_KEY_FAMILY, secretKey);
        const data = await Storage.load(STORAGE_KEY_TASKS);
        console.log('--> loadTasks data', data);
        // console.log('data', data);
        // console.log(JSON.stringify(data, null, 2));
        dispatch({type: TASKS_LOAD, ...data});
    } catch (error) {
        console.log(error);
    }
};

export const saveTask = () => async (dispatch, getState) => {
    console.log('saveTask');
    try {
        const data = getState().tasks;
        console.log('data', data);
        // const {secretKey} = getState().wollo;
        // await Storage.save(STORAGE_KEY_FAMILY, data, secretKey);
        await Storage.save(STORAGE_KEY_TASKS, data);
    } catch (error) {
        console.log(error);
    }
};

export const tasksAddTask = (task) => async dispatch => {
    console.log('TASKS_ADD_TASK', task);
    dispatch(tasksLoading(true));

    // addChild
    // create stellar account
    // trust wollo
    // add main account as signer
    // store locally (encrypt using stellar key?)
    dispatch(({type: TASKS_ADD_TASK, task: task}));
    await dispatch(saveTask());
    dispatch(tasksLoading(false));
};
