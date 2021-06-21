import { managerBaseURL } from './common';

export const NODES_GET_IN_PROGRESS = 'NODES_GET_IN_PROGRESS';
export const NODES_GET_SUCCESS = 'NODES_GET_SUCCESS';
export const NODES_GET_ERROR = 'NODES_GET_ERROR';

export const nodesGetURL = (address) => {
    const baseURL = managerBaseURL();
    return `${baseURL}/nodes`;
};
