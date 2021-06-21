import {
    PROVIDERS_GET_ERROR,
    PROVIDERS_GET_IN_PROGRESS,
    PROVIDERS_GET_SUCCESS, PROVIDERS_PLANS_SET,
    providersGetURL,
} from '../constants/providers';
import Axios from '../services/axios';

export const getProvidersInProgress = (data) => {
    return {
        type: PROVIDERS_GET_IN_PROGRESS,
        data,
    };
};

export const getProvidersSuccess = (data) => {
    return {
        type: PROVIDERS_GET_SUCCESS,
        data,
    };
};

export const getProvidersError = (data) => {
    return {
        type: PROVIDERS_GET_ERROR,
        data,
    };
};

export const getProviders = () => async (dispatch, getState) => {
    dispatch(getProvidersInProgress(true));
    try {
        const url = providersGetURL();
        const response = await Axios.get(url);
        const result = response?.data?.result;
        return dispatch(getProvidersSuccess(result));
    } catch (error) {
        return dispatch(getProvidersError(error?.response?.data?.error));
    }
};

export const setProvidersPlans = (providerAddress, planIDs) => {
    return {
        type: PROVIDERS_PLANS_SET,
        data: {
            providerAddress,
            planIDs,
        },
    };
};
