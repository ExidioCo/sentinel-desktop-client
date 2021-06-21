import * as actionTypes from '../../constants/subscriptions';
import { combineReducers } from 'redux';

const params = (state = {
    nodeAddress: '',
}, action) => {
    switch (action.type) {
    case actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_PARAMS_SET_NODE_ADDRESS:
        return {
            ...state,
            nodeAddress: action.data,
        };
    case actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_SUCCESS:
    case actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_MODAL_HIDE:
        return {
            nodeAddress: '',
        };
    default:
        return state;
    }
};

const modal = (state = false, {
    type,
}) => {
    switch (type) {
    case actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_MODAL_SHOW:
        return true;
    case actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_MODAL_HIDE:
    case actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_ERROR:
    case actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_SUCCESS:
        return false;
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_IN_PROGRESS:
        return true;
    case actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_SUCCESS:
    case actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_ERROR:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    params,
    modal,
    inProgress,
});
