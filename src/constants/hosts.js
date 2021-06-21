import { managerBaseURL } from './common';

export const HOSTS_GET_IN_PROGRESS = 'HOSTS_GET_IN_PROGRESS';
export const HOSTS_GET_SUCCESS = 'HOSTS_GET_SUCCESS';
export const HOSTS_GET_ERROR = 'HOSTS_GET_ERROR';

export const hostsGetURL = (address) => {
    const baseURL = managerBaseURL();
    return `${baseURL}/hosts`;
};

export const HOSTS_SORT_SET = 'HOSTS_SORT_SET';
