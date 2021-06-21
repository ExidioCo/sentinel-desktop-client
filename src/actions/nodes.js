import {
    NODES_GET_ERROR,
    NODES_GET_IN_PROGRESS,
    NODES_GET_SUCCESS,
    nodesGetURL,
} from '../constants/nodes';
import Axios from '../services/axios';

export const getNodesInProgress = (data) => {
    return {
        type: NODES_GET_IN_PROGRESS,
        data,
    };
};

export const getNodesSuccess = (data) => {
    return {
        type: NODES_GET_SUCCESS,
        data,
    };
};

export const getNodesError = (data) => {
    return {
        type: NODES_GET_ERROR,
        data,
    };
};

export const getNodes = () => async (dispatch) => {
    dispatch(getNodesInProgress(true));
    const url = nodesGetURL();
    try {
        const response = await Axios.get(url);
        const nodes = response?.data?.result;
        const nodesWithStatus = await Promise.all(nodes.map(async (node) => {
            const nodeStatusURL = `${node.remote_url}/status`;
            const statusResponse = await Axios.get(nodeStatusURL);
            node.status = statusResponse?.data?.result;
            return node;
        }));
        dispatch(getNodesSuccess(nodesWithStatus));
    } catch (error) {
        dispatch(getNodesError(error?.response?.data?.error));
    }
};
