import { managerBaseURL } from './common';

export const PLANS_GET_IN_PROGRESS = 'PLANS_GET_IN_PROGRESS';
export const PLANS_GET_SUCCESS = 'PLANS_GET_SUCCESS';
export const PLANS_GET_ERROR = 'PLANS_GET_ERROR';

export const plansGetURL = (address) => {
    const baseURL = managerBaseURL();
    return `${baseURL}/providers/${address}/plans`;
};
