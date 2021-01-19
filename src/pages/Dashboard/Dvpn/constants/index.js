/**
 @desc
 * Centralized unique action types for DVPN actions and reducers.
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

export const GET_SESSION_OF_AN_ADDRESS_API = `${API_URL}/api/v1/accounts`;
export const GET_PROVIDERS_API = `${API_URL}/api/v1/providers`;

export const DvpnActionTypes = {
    get_SessionOfAnAddress: createRequestActionTypes('GET_SESSION_OF_AN_ADDRESS'),
    get_Providers: createRequestActionTypes('GET_PROVIDERS'),
};