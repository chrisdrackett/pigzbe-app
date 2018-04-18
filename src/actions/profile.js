export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const PROFILE_FINISH = 'PROFILE_FINISH';

const wait = (time, value) => new Promise(resolve => setTimeout(() => resolve(value), time * 1000));

export const profileUpdate = data => dispatch => {
    dispatch({type: PROFILE_UPDATE, ...data});
    return wait(1, true);
};

export const profileFinish = () => ({type: PROFILE_FINISH});
