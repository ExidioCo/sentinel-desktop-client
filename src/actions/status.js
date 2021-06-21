import {
    STATUS_GET_ERROR,
    STATUS_GET_IN_PROGRESS,
    STATUS_GET_SUCCESS,
    statusGetURL,
} from '../constants/status';
import Lodash from 'lodash';
import publicIp from 'public-ip';

export const getStatusInProgress = (data) => {
    return {
        type: STATUS_GET_IN_PROGRESS,
        data,
    };
};

export const getStatusSuccess = (data) => {
    return {
        type: STATUS_GET_SUCCESS,
        data,
    };
};

export const getStatusError = (data) => {
    return {
        type: STATUS_GET_ERROR,
        data,
    };
};

export const getStatus = () => async (dispatch, getState) => {
    dispatch(getStatusInProgress(true));

    const {
        keys: {
            items,
            name,
        },
    } = getState();

    const item = Lodash.find(items, ['name', name]);
    statusGetURL(item.address);
    try {
        // const response = await Axios.get(url);
        // const result = response?.data?.result;
        const result = {
            connected: false,
        };
        if (!result.connected) {
            result.address = await publicIp.v4();
        }
        dispatch(getStatusSuccess(result));
    } catch (error) {
        dispatch(getStatusError(error?.response?.data?.error));
    }
};
