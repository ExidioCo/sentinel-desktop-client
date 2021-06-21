import {
    PLANS_GET_ERROR,
    PLANS_GET_IN_PROGRESS,
    PLANS_GET_SUCCESS, plansGetURL,
} from '../constants/plans';
import { setProvidersPlans } from './providers';
import Axios from '../services/axios';

export const getPlansInProgress = (data) => {
    return {
        type: PLANS_GET_IN_PROGRESS,
        data,
    };
};

export const getPlansSuccess = (data) => {
    return {
        type: PLANS_GET_SUCCESS,
        data,
    };
};

export const getPlansError = (data) => {
    return {
        type: PLANS_GET_ERROR,
        data,
    };
};

export const getPlans = (address) => async (dispatch, getState) => {
    dispatch(getPlansInProgress(true));
    const url = plansGetURL(address);
    try {
        const res = await Axios.get(url);
        const result = res?.data?.result;
        dispatch(getPlansSuccess(result));
        dispatch(setProvidersPlans(address, result.map((plan) => plan.id)));
    } catch (error) {
        dispatch(getPlansError(error?.response?.data?.error));
    }
};
