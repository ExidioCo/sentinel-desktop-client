import { LoginActionTypes } from '../constants/index';

const initialState = {
    loading: false,
    loggedInUserDetails: null,
    isAuthenticated: false,

    checkConfigDetails: null,
    checkKeysDetails: null,

    redirectURL: '',

    createAccount: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        // Login Reducer Reducer
        case LoginActionTypes.post_Login.REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            };
        case LoginActionTypes.post_Login.SUCCESS:
            return {
                ...state,
                loading: false,
                loggedInUserDetails: payload,
                isAuthenticated: true
            };
        case LoginActionTypes.post_Login.FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
            };

        // Check Config Reducer
        case LoginActionTypes.get_CheckConfig.REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            };
        case LoginActionTypes.get_CheckConfig.SUCCESS:
            return {
                ...state,
                loading: false,
                checkConfigDetails: payload,
                isAuthenticated: true
            };
        case LoginActionTypes.get_CheckConfig.FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
            };
        
        // Check keys Reducer
        case LoginActionTypes.get_CheckKeys.REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
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
                isAuthenticated: false
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
            };
        case LoginActionTypes.post_CreateAccount.FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
