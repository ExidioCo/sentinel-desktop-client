import * as actionTypes from '../../constants/subscriptions';
import { subscriptionsAddURL } from '../../constants/subscriptions';
import Axios from 'axios';

export const addIndividualHostSubscriptionInProgress = (data) => {
    return {
        type: actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_IN_PROGRESS,
        data,
    };
};

export const addIndividualHostSubscriptionSuccess = (data) => {
    return {
        type: actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_SUCCESS,
        data,
    };
};

export const addIndividualHostSubscriptionError = (data) => {
    return {
        type: actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_ERROR,
        data,
    };
};

export const addIndividualHostSubscription = (address) => async (dispatch, getState) => {
    dispatch(addIndividualHostSubscriptionInProgress(true));
    const url = subscriptionsAddURL(address);
    try {
        const res = await Axios.get(url);
        console.log(res);
        dispatch(addIndividualHostSubscriptionSuccess());
    } catch (error) {
        console.log(error);
        dispatch(addIndividualHostSubscriptionError(error?.response?.data?.error));
    }
};

export const showAddIndividualHostSubscriptionModal = () => {
    return {
        type: actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_MODAL_SHOW,
    };
};

export const hideAddIndividualHostSubscriptionModal = () => {
    return {
        type: actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_MODAL_HIDE,
    };
};

export const setAddIndividualHostSubscriptionParamsNodeAddress = (data) => {
    return {
        type: actionTypes.SUBSCRIPTIONS_INDIVIDUAL_HOST_ADD_PARAMS_SET_NODE_ADDRESS,
        data,
    };
};
