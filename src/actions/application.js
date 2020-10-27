import {
    APPLICATION_LOADING_ERROR,
    APPLICATION_LOADING_IN_PROGRESS,
    APPLICATION_LOADING_SUCCESS,
    AUTHENTICATION_PASSWORD_SET,
    CHAIN_ID_SET,
    RPC_SERVER_ADDRESS_SET,
    SERVER_ID_SET,
} from '../constants/application';

export const loadingError = () => {
    return {
        type: APPLICATION_LOADING_ERROR,
    };
};

export const loadingInProgress = () => {
    return {
        type: APPLICATION_LOADING_IN_PROGRESS,
    };
};

export const loadingSuccess = () => {
    return {
        type: APPLICATION_LOADING_SUCCESS,
    };
};

export const load = () => (dispatch) => {
    dispatch(loadingInProgress());

    try {
        const loader = document.querySelector('.loader-container');
        if (loader) {
            loader.remove();
        }
    } catch (e) {
        console.error(e);
        dispatch(loadingError());
    }

    dispatch(loadingSuccess());
};

export const setAuthenticationPassword = (value) => {
    return {
        type: AUTHENTICATION_PASSWORD_SET,
        value,
    };
};

export const setChainID = (value) => {
    return {
        type: CHAIN_ID_SET,
        value,
    };
};

export const setServerID = (value) => {
    return {
        type: SERVER_ID_SET,
        value,
    };
};

export const setRPCServerAddress = (value) => {
    return {
        type: RPC_SERVER_ADDRESS_SET,
        value,
    };
};
