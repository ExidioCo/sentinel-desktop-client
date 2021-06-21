import { SESSIONS_GET_ERROR, SESSIONS_GET_IN_PROGRESS, SESSIONS_GET_SUCCESS, SESSIONS_SORT_SET } from '../constants/sessions';
import { combineReducers } from 'redux';

const items = (state = [{
    id: 18,
    bandwidth: {
        download: 47605350,
    },
    duration: 63000000000,
    status_at: '2019-02-20T08:29:02+05:30',
}, {
    id: 19,
    bandwidth: {
        download: 97405350,
    },
    duration: 334000000000,
    status_at: '2021-04-20T05:16:45+05:30',
}], {
    type,
    data,
}) => {
    switch (type) {
    case SESSIONS_GET_SUCCESS:
        return data;
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case SESSIONS_GET_IN_PROGRESS:
        return true;
    case SESSIONS_GET_SUCCESS:
    case SESSIONS_GET_ERROR:
        return false;
    default:
        return state;
    }
};

const sort = (state = {
    by: 'id',
    order: 'desc',
}, {
    type,
    data,
}) => {
    switch (type) {
    case SESSIONS_SORT_SET:
        return {
            ...state,
            by: data.by,
            order: data.order,
        };
    default:
        return state;
    }
};

export default combineReducers({
    items,
    inProgress,
    sort,
});
