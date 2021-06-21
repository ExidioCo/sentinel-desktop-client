import * as actionTypes from '../../constants/subscriptions';
import * as uiActionsTypes from '../../constants/ui';
import { combineReducers } from 'redux';

const params = (state = {
    providerAddress: '',
    planID: 0,
}, action) => {
    switch (action.type) {
    case actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_PARAMS_SET_PROVIDER_ADDRESS:
        return {
            ...state,
            providerAddress: action.data,
        };
    case actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_PARAMS_SET_PLAN_ID:
        return {
            ...state,
            planID: action.data,
        };
    case actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_MODAL_HIDE:
    case uiActionsTypes.UI_DVPN_SET_SELECTED_TAB:
    case uiActionsTypes.UI_DVPN_TOGGLE_SHOW_SUBSCRIBED:
    case uiActionsTypes.UI_DVPN_SET_SHOW_MAP:
        return {
            providerAddress: '',
            planID: 0,
        };
    default:
        return state;
    }
};

const modal = (state = false, {
    type,
}) => {
    switch (type) {
    case actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_MODAL_SHOW:
        return true;
    case actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_IN_PROGRESS:
        return true;
    case actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_SUCCESS:
    case actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_ERROR:
        return false;
    default:
        return state;
    }
};

const status = (state = {
    success: false,
    error: {
        code: 0,
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_SUCCESS:
        return {
            ...state,
            success: true,
        };
    case actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_ERROR:
        return {
            ...state,
            success: false,
            error: {
                code: data.code,
                message: data.message,
            },
        };
    default:
        return state;
    }
};

export default combineReducers({
    params,
    modal,
    inProgress,
    status,
});
