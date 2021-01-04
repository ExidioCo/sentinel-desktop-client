import { LoginActionTypes } from '../constants/index';

const initialState = {
    loading: false,
    loggedInUserDetails: null,
    isAuthenticated: false,
    isPostLoginAuth: false,

    checkConfigDetails: null,
    checkKeysDetails: null,

    redirectURL: '',

    createAccount: null,

    updateConfigDetails: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        // Login Reducer Reducer
        case LoginActionTypes.post_Login.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LoginActionTypes.post_Login.SUCCESS:
            return {
                ...state,
                loading: false,
                loggedInUserDetails: payload,
            };
        case LoginActionTypes.post_Login.FAILURE:
            return {
                ...state,
                loading: false,
            };

        // Check Config Reducer
        case LoginActionTypes.get_CheckConfig.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LoginActionTypes.get_CheckConfig.SUCCESS:
            return {
                ...state,
                loading: false,
                checkConfigDetails: payload,
                isPostLoginAuth: true
            };
        case LoginActionTypes.get_CheckConfig.FAILURE:
            return {
                ...state,
                loading: false,
                isPostLoginAuth: false
            };
        
        // Check keys Reducer
        case LoginActionTypes.get_CheckKeys.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LoginActionTypes.get_CheckKeys.SUCCESS:
            return {
                ...state,
                loading: false,
                checkKeysDetails: payload,
                isAuthenticated: true
            };
        case LoginActionTypes.get_CheckKeys.FAILURE:
            return {
                ...state,
                loading: false,
            };
        
        // Set Redirect URL
       
        case LoginActionTypes.set_redirectURL.SUCCESS:
            return {
                ...state,
                redirectURL: payload
            };
        
        // Create Account Reducer

        case LoginActionTypes.post_CreateAccount.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LoginActionTypes.post_CreateAccount.SUCCESS:
            return {
                ...state,
                loading: false,
                createAccount: payload,
                isAuthenticated: true
            };
        case LoginActionTypes.post_CreateAccount.FAILURE:
            return {
                ...state,
                loading: false,
            };

        // Update Config Reducer
        case LoginActionTypes.put_UpdateConfigDetails.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LoginActionTypes.put_UpdateConfigDetails.SUCCESS:
            return {
                ...state,
                loading: false,
                updateConfigDetails: payload,
                isPostLoginAuth: true
            };
        case LoginActionTypes.put_UpdateConfigDetails.FAILURE:
            return {
                ...state,
                loading: false,
                isPostLoginAuth: false
            };

        // Check Config Reducer post login
        case LoginActionTypes.get_CheckConfigPostLogin.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LoginActionTypes.get_CheckConfigPostLogin.SUCCESS:
            return {
                ...state,
                loading: false,
                checkConfigDetails: payload,
            };
        case LoginActionTypes.get_CheckConfigPostLogin.FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
