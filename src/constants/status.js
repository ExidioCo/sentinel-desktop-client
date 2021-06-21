import { managerBaseURL } from './common';

export const STATUS_GET_IN_PROGRESS = 'STATUS_GET_IN_PROGRESS';
export const STATUS_GET_SUCCESS = 'STATUS_GET_SUCCESS';
export const STATUS_GET_ERROR = 'STATUS_GET_ERROR';

export const statusGetURL = (address) => {
    const baseURL = managerBaseURL();
    return `${baseURL}/status/${address}`;
};
