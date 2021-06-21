import { managerBaseURL } from './common';

export const PROVIDERS_GET_IN_PROGRESS = 'PROVIDERS_GET_IN_PROGRESS';
export const PROVIDERS_GET_SUCCESS = 'PROVIDERS_GET_SUCCESS';
export const PROVIDERS_GET_ERROR = 'PROVIDERS_GET_ERROR';

export const providersGetURL = (address) => {
    const baseURL = managerBaseURL();
    return `${baseURL}/providers`;
};

export const PROVIDERS_PLANS_SET = 'PROVIDERS_PLANS_SET';
