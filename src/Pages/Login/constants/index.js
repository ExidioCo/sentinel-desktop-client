/**
 @desc
 * Centralized unique action types for Login actions and reducers.
 */


import {
    actionCreator,
    API_URL,
    createRequestActionTypes,
    jsonApiHeader,
    checkHttpStatus
} from '../../../utils/utility';

export {
    jsonApiHeader,
    actionCreator,
    checkHttpStatus
};

export const POST_LOGIN_API = `${API_URL}/api/v1/login`;
export const GET_CHECK_CONFIG_API = `${API_URL}/api/v1/config`;
export const GET_CHECK_KEYS_API = `${API_URL}/api/v1/keys`;

export const POST_CREATE_ACCOUNT_API = `${API_URL}/api/v1/keys`;

export const LoginActionTypes = {
    post_Login: createRequestActionTypes('POST_LOGIN'),
    get_CheckConfig: createRequestActionTypes('GET_CHECK_CONFIG_API'),
    get_CheckKeys: createRequestActionTypes('GET_CHECK_KEYS_API'),

    set_redirectURL: createRequestActionTypes('REDIRECT_URL'),

    post_CreateAccount: createRequestActionTypes('POST_CREATE_ACCOUNT_API')
};