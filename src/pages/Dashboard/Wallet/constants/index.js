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

export const GET_VALIDATOR_LIST_API = `${API_URL}/api/v1/validators?limit=100&page=1`;
export const GET_PROPOSAL_LIST_API = `${API_URL}/api/v1/proposals`;
export const GET_VALIDATOR_AVATAR_API = `https://keybase.io/_/api/1.0/user/lookup.json`

export const POST_SAVE_DELEGATE_API = `${API_URL}/api/v1/delegators`;
export const POST_SAVE_RE_DELEGATE_API = `${API_URL}/api/v1/delegators`;
export const POST_SAVE_UNBOND_API = `${API_URL}/api/v1/delegators`;

export const GET_AN_ACCOUNT_DETAILS_API = `${API_URL}/api/v1/accounts`;
export const GET_COINGECKO_DETAILS_API = "https://api.coingecko.com/api/v3/coins/sentinel-group"

export const POST_SEND_TOKENS_API = `${API_URL}/api/v1/bank/send`;
export const GET_ALL_DELEGATIONS_API = `${API_URL}/api/v1/delegators`;

export const POST_VOTE_API = `${API_URL}/api/v1/proposals`;
export const POST_WITHDRAW_REWARDS_API = `${API_URL}/api/v1/delegators`;



export const WalletActionTypes = {
    get_ValidatorList: createRequestActionTypes('GET_VALIDATOR_LIST'),
    get_ProposalList: createRequestActionTypes('GET_PROPOSAL_LIST'),
    get_ValidatorAvatar: createRequestActionTypes('GET_VALIDATOR_AVATAR'),

    post_SaveDelegate: createRequestActionTypes('POST_SAVE_DELEGATE'),
    post_SaveReDelegate: createRequestActionTypes('POST_SAVE_RE_DELEGATE'),
    post_SaveUnbond: createRequestActionTypes('POST_SAVE_UNBOND'),

    get_AnAccountDetails: createRequestActionTypes('GET_AN_ACCOUNT_DETAILS'),
    get_CoingekoDetails: createRequestActionTypes('GET_COINGECKO_DETAILS_API'),

    post_SendTokens: createRequestActionTypes('POST_SEND_TOKENS_API'),
    reset_SendTokenReducer: createRequestActionTypes('RESET_SEND_TOKENS_REDUCER'),
    get_AllDelegations: createRequestActionTypes('GET_ALL_DELEGATIONS'),
    resetSaveDelegate: createRequestActionTypes('RESET_SAVE_DELEGATE'),

    post_Vote: createRequestActionTypes('POST_VOTE'),
    post_WithdrawRewards: createRequestActionTypes('POST_WITHDRAW_REWARDS'),
    reset_WithDrawReducer: createRequestActionTypes('RESET_WITHDRAW_REWARDS')
};