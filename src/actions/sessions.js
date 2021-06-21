import {
    SESSIONS_GET_ERROR,
    SESSIONS_GET_IN_PROGRESS,
    SESSIONS_GET_SUCCESS,
    SESSIONS_SORT_SET,
    sessionsGetURL,
} from '../constants/sessions';
import Axios from '../services/axios';
import Lodash from 'lodash';

export const getSessionsInProgress = (data) => {
    return {
        type: SESSIONS_GET_IN_PROGRESS,
        data,
    };
};

export const getSessionsSuccess = (data) => {
    return {
        type: SESSIONS_GET_SUCCESS,
        data,
    };
};

export const getSessionsError = (data) => {
    return {
        type: SESSIONS_GET_ERROR,
        data,
    };
};

export const getSessions = () => async (dispatch, getState) => {
    dispatch(getSessionsInProgress(true));
    const {
        keys: {
            items,
            name,
        },
    } = getState();

    const item = Lodash.find(items, ['name', name]);
    const url = sessionsGetURL(item.address);
    try {
        const res = await Axios.get(url);
        dispatch(getSessionsSuccess(res?.data?.result));
    } catch (error) {
        dispatch(getSessionsError(error?.response?.data?.error));
    }
};

export const setSessionsSort = (data) => {
    return {
        type: SESSIONS_SORT_SET,
        data,
    };
};
