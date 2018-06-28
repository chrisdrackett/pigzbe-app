import {Record} from 'immutable';
import {save} from '../../utils/storage';
import {
    LOCAL_STORAGE,
    ERROR
} from '../../constants/action-types';

const initialState = new Record({
    localStorage: null,
    burningLoadingStage: 0,
    error: null
})();

export default (state = initialState, action) => {
    switch (action.type) {
        case LOCAL_STORAGE: {
            const localStorage = {...state.localStorage, ...action.payload};
            save('burning', localStorage);
            return state
                .set('localStorage', localStorage);
        }
        case ERROR: {
            const localStorage = {
                ...state.localStorage,
                error: action.payload
            };
            save('burning', localStorage);
            return state
                .set('localStorage', localStorage);
        }
        default:
            return state;
    }
};
