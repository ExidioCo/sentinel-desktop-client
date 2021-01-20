
/**
 @description
 * This file contains generic functions. 
 * They are here in utility because we are using them across the application.
 */
import bech32 from 'bech32';
import history from './history';
import { toast } from 'react-smart-toaster';

const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

export const TOKEN_EXPIRY_MESSAGE = "Session has expired. Login again!"

// export const API_URL = ''
export const API_URL = 'http://127.0.0.1:8080'


export function actionCreator(actionType, data) {
    return {
        type: actionType,
        payload: data
    };
}

export function createRequestActionTypes(base) {
    return [REQUEST, SUCCESS, FAILURE].reduce((requestTypes, type) => {
        requestTypes[type] = `${base}_${type}`;
        return requestTypes;
    }, {});
}

export function handleLoginRedirect(token, targetUrl) {
    localStorage.setItem("access_token", token);
    history.push(targetUrl);
}

export function handleLogoutRedirect() {
    localStorage.clear();
    window.location.pathname = '/login'
}

export const jsonApiHeader = accessToken => {
    return {
        "Content-Type": "application/json",
        "Authorization": accessToken ? `Bearer ${accessToken}` : ""
    };
};

export const checkHttpStatus = (response) => {
   if(response.status === 401) {
       window.location.reload();
       toast.error('session expired')
   } else {
    toast.error(response.data.error.message)
   }
}

export const encodeToBech32 = (key, prefix) => {
    if (key === undefined || key === '') {
        return new Error('key is empty')
    }
    if (prefix === undefined || prefix === '') {
        return new Error('prefix is empty')
    }

    try {
        let words = bech32.toWords(Buffer.from(key, 'hex'));
        return bech32.encode(prefix, words);
    } catch (e) {
        return e;
    }
};

export const decodeFromBech32 = (key) => {
    if (key === undefined || key === '') {
        return new Error('key is empty')
    }

    try {
        let decoded = bech32.decode(key);
        return Buffer.from(bech32.fromWords(decoded.words))
            .toString('hex')
            .toUpperCase();
    } catch (e) {
        return false;
    }
};