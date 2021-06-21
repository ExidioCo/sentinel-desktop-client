import { managerBaseURL } from './common';

export const SESSIONS_GET_IN_PROGRESS = 'SESSIONS_GET_IN_PROGRESS';
export const SESSIONS_GET_SUCCESS = 'SESSIONS_GET_SUCCESS';
export const SESSIONS_GET_ERROR = 'SESSIONS_GET_ERROR';

export const sessionsGetURL = (address) => {
    const baseURL = managerBaseURL();
    return `${baseURL}/accounts/${address}/sessions`;
};

export const SESSIONS_SORT_SET = 'SESSIONS_SORT_SET';
