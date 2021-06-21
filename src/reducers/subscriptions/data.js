import { SUBSCRIPTIONS_GET_ERROR, SUBSCRIPTIONS_GET_IN_PROGRESS, SUBSCRIPTIONS_GET_SUCCESS } from '../../constants/subscriptions';
import { combineReducers } from 'redux';

const items = (state = [], action) => {
    switch (action.type) {
    case SUBSCRIPTIONS_GET_SUCCESS:
        return action.data;
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case SUBSCRIPTIONS_GET_IN_PROGRESS:
        return true;
    case SUBSCRIPTIONS_GET_SUCCESS:
    case SUBSCRIPTIONS_GET_ERROR:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    items,
    inProgress,
});
