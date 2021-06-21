import { PLANS_GET_ERROR, PLANS_GET_IN_PROGRESS, PLANS_GET_SUCCESS } from '../constants/plans';
import { combineReducers } from 'redux';
import Lodash from 'lodash';

const items = (state = {}, action) => {
    switch (action.type) {
    case PLANS_GET_SUCCESS:
        return Lodash.merge(state, Lodash.keyBy(action.data, (plan) => plan.id));
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case PLANS_GET_IN_PROGRESS:
        return true;
    case PLANS_GET_SUCCESS:
    case PLANS_GET_ERROR:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    items,
    inProgress,
});
