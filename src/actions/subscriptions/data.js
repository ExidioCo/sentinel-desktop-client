import * as actionTypes from '../../constants/subscriptions';
import { subscriptionsGetURL } from '../../constants/subscriptions';
import Axios from '../../services/axios';

const getSubscriptionsInProgress = (data) => {
    return {
        type: actionTypes.SUBSCRIPTIONS_GET_IN_PROGRESS,
        data,
    };
};

const getSubscriptionsSuccess = (data) => {
    return {
        type: actionTypes.SUBSCRIPTIONS_GET_SUCCESS,
        data,
    };
};

const getSubscriptionsError = (data) => {
    return {
        type: actionTypes.SUBSCRIPTIONS_GET_ERROR,
        data,
    };
};

export const getSubscriptions = () => async (dispatch, getState) => {
    dispatch(getSubscriptionsInProgress(true));
    const { account: { info: { address } } } = getState();
    const url = subscriptionsGetURL(address);
    try {
        const response = await Axios.get(url);
        dispatch(getSubscriptionsSuccess(response.data.result));
    } catch (error) {
        console.log(error);
        dispatch(getSubscriptionsError(error?.response?.data?.error));
    }
};
