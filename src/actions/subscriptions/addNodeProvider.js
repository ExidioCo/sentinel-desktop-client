import * as actionTypes from '../../constants/subscriptions';
import { COIN_DENOM } from '../../constants/common';
import { subscriptionsAddURL } from '../../constants/subscriptions';
import Axios from '../../services/axios';

export const addNodeProviderSubscriptionInProgress = (data) => {
    return {
        type: actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_IN_PROGRESS,
        data,
    };
};

export const addNodeProviderSubscriptionSuccess = (data) => {
    return {
        type: actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_SUCCESS,
        data,
    };
};

export const addNodeProviderSubscriptionError = (data) => {
    return {
        type: actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_ERROR,
        data,
    };
};

export const addNodeProviderSubscription = (planId) => async (dispatch, getState) => {
    dispatch(addNodeProviderSubscriptionInProgress(true));
    const { account: { info: { address } } } = getState();
    const url = subscriptionsAddURL(address);
    try {
        await Axios.post(url, {
            id: planId,
            denom: COIN_DENOM,
        });
        dispatch(addNodeProviderSubscriptionSuccess());
    } catch (error) {
        console.log(error);
        dispatch(addNodeProviderSubscriptionError(error?.response?.data?.error));
    }
};

export const showAddNodeProviderSubscriptionModal = () => {
    return {
        type: actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_MODAL_SHOW,
    };
};

export const hideAddNodeProviderSubscriptionModal = () => {
    return {
        type: actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_MODAL_HIDE,
    };
};

export const setAddNodeProviderSubscriptionParamsProviderAddress = (data) => {
    return {
        type: actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_PARAMS_SET_PROVIDER_ADDRESS,
        data,
    };
};

export const setAddNodeProviderSubscriptionParamsPlanID = (data) => {
    return {
        type: actionTypes.SUBSCRIPTIONS_NODE_PROVIDER_ADD_PARAMS_SET_PLAN_ID,
        data,
    };
};
