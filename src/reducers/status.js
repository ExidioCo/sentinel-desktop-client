import { STATUS_GET_ERROR, STATUS_GET_IN_PROGRESS, STATUS_GET_SUCCESS } from '../constants/status';
import { combineReducers } from 'redux';

const info = (state = {
    connected: false,
    address: '',
}, {
    type,
    data,
}) => {
    switch (type) {
    case STATUS_GET_SUCCESS:
        return data;
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case STATUS_GET_IN_PROGRESS:
        return true;
    case STATUS_GET_SUCCESS:
    case STATUS_GET_ERROR:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    info,
    inProgress,
});
