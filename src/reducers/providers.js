import { PROVIDERS_GET_ERROR, PROVIDERS_GET_IN_PROGRESS, PROVIDERS_GET_SUCCESS, PROVIDERS_PLANS_SET } from '../constants/providers';
import { combineReducers } from 'redux';
import Lodash from 'lodash';

const items = (state = [], action) => {
    switch (action.type) {
    case PROVIDERS_GET_SUCCESS:
        return Lodash.zipObject(
            action.data.map((provider) => provider.address),
            action.data.map((provider) => Object.assign({}, provider, { planIDs: [] })),
        );
    case PROVIDERS_PLANS_SET:
        return Lodash.mapValues(state, (provider, providerAddress) => {
            const result = Object.assign({}, provider);
            if (providerAddress === action.data.providerAddress) {
                result.planIDs = action.data.planIDs;
            }
            return result;
        });
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case PROVIDERS_GET_IN_PROGRESS:
        return true;
    case PROVIDERS_GET_SUCCESS:
    case PROVIDERS_GET_ERROR:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    items,
    inProgress,
});
