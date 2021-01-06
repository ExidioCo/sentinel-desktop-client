/**
 @desc
 * Centralized unique action types for Wallet actions and reducers.
 */


import {
    actionCreator,
    API_URL,
    createRequestActionTypes,
    jsonApiHeader,
    checkHttpStatus
} from '../../../../utils/utility';

export {
    jsonApiHeader,
    actionCreator,
    checkHttpStatus
};

export const GET_VALIDATOR_LIST_API = `${API_URL}/api/v1/validators`;
export const GET_PROPOSAL_LIST_API = `${API_URL}/api/v1/proposals`;

export const WalletActionTypes = {
    get_ValidatorList: createRequestActionTypes('GET_VALIDATOR_LIST'),
    get_ProposalList: createRequestActionTypes('GET_PROPOSAL_LIST'),
};