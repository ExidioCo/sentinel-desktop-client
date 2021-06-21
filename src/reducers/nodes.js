import { NODES_GET_ERROR, NODES_GET_IN_PROGRESS, NODES_GET_SUCCESS } from '../constants/nodes';
import { combineReducers } from 'redux';
import Lodash from 'lodash';

const items = (state = [], action) => {
    switch (action.type) {
    case NODES_GET_SUCCESS:
        return Lodash.keyBy(action.data, (node) => node.address);
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case NODES_GET_IN_PROGRESS:
        return true;
    case NODES_GET_SUCCESS:
    case NODES_GET_ERROR:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    items,
    inProgress,
});
