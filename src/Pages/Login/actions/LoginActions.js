
/**
 @desc
 * Centralized unique actions for Login Module.
 */
import React from 'react';
import {
    actionCreator,
    jsonApiHeader,
    LoginActionTypes,
    POST_LOGIN_API,
    GET_CHECK_CONFIG_API,
    GET_CHECK_KEYS_API,
    POST_CREATE_ACCOUNT_API,
    PUT_UPDATE_CONFIG_DETAILS_API
} from '../constants/index';
import axios from 'axios';
import { handleLoginRedirect, TOKEN_EXPIRY_MESSAGE } from '../../../utils/utility';
import history from '../../../utils/history';


/**
 * @desc Action to vaidate login
 * @param  {[object]} postData [The data needed as a payload for the API interaction]
 */

export const LoginUserAction = (postData) => {
    return dispatch => {
        dispatch(actionCreator(LoginActionTypes.post_Login.REQUEST));
        axios({
            method: 'post',
            url: POST_LOGIN_API,
            data: postData,
            headers: jsonApiHeader(),
        })
            .then(function (response) {
                if(response.data.success === true ) {
                    dispatch(actionCreator(LoginActionTypes.post_Login.SUCCESS, response));
                    dispatch(CheckConfigAction())
                } else {
                    dispatch(actionCreator(LoginActionTypes.post_Login.FAILURE));
                }

            })
            .catch(function (error) {
                dispatch(actionCreator(LoginActionTypes.post_Login.FAILURE));
                console.log('error post_Login ..', error);
            });
    };
};



/**
 * @desc Action to check config immediately after login
 */
export const CheckConfigAction = () => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        dispatch(actionCreator(LoginActionTypes.get_CheckConfig.REQUEST));
        axios({
            method: 'get',
            url: GET_CHECK_CONFIG_API,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if(response.data.success === true ) {
                    dispatch(actionCreator(LoginActionTypes.get_CheckConfig.SUCCESS, response));
                    if(response.data.result.chain.id !== '') {
                        dispatch(CheckKeysAction());
                    } else {
                        dispatch(actionCreator(LoginActionTypes.set_redirectURL.SUCCESS, '/configure-setting'));
                        handleLoginRedirect(token, '/configure-setting');
                    }
                } else {
                    dispatch(actionCreator(LoginActionTypes.get_CheckConfig.FAILURE));
                }

            })
            .catch(function (error) {
                dispatch(actionCreator(LoginActionTypes.get_CheckConfig.FAILURE));
                console.log('error get_CheckConfig ..', error);
            });
    };
};

/**
 * @desc Action to check keys immediately after checking the config post login
 */
export const CheckKeysAction = () => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        dispatch(actionCreator(LoginActionTypes.get_CheckKeys.REQUEST));
        axios({
            method: 'get',
            url: GET_CHECK_KEYS_API,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if(response.data.success === true ) {
                    dispatch(actionCreator(LoginActionTypes.get_CheckKeys.SUCCESS, response));
                    if(response.data.result.length > 0) {
                        dispatch(actionCreator(LoginActionTypes.set_redirectURL.SUCCESS, '/dashboard/wallet'));
                        handleLoginRedirect(response.data.result.value, '/dashboard/wallet');
                    } else {
                        dispatch(actionCreator(LoginActionTypes.set_redirectURL.SUCCESS, '/create-account'));
                        handleLoginRedirect(token, '/create-account');
                    }
                } else {
                    dispatch(actionCreator(LoginActionTypes.get_CheckKeys.FAILURE));
                }

            })
            .catch(function (error) {
                dispatch(actionCreator(LoginActionTypes.get_CheckKeys.FAILURE));
                console.log('error get_CheckKeys ..', error);
            });
    };
};


/**
 * @desc Action to update config
 * @param  {[object]} postData [The data needed as a payload for the API interaction]
 */

export const UpdateConfigAction = (postData) => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        dispatch(actionCreator(LoginActionTypes.put_UpdateConfigDetails.REQUEST));
        axios({
            method: 'put',
            url: PUT_UPDATE_CONFIG_DETAILS_API,
            data: postData,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if(response.data.success === true ) {
                    dispatch(actionCreator(LoginActionTypes.put_UpdateConfigDetails.SUCCESS, response));
                    dispatch(CheckKeysAction())
                } else {
                    dispatch(actionCreator(LoginActionTypes.put_UpdateConfigDetails.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(LoginActionTypes.put_UpdateConfigDetails.FAILURE));
                console.log('error put_UpdateConfigDetails ..', error);
            });
    };
};


/**
 * @desc Action to create account post login
 * @param  {[object]} postData [The data needed as a payload for the API interaction]
 */

export const CreateAccountAction = (postData) => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        dispatch(actionCreator(LoginActionTypes.post_CreateAccount.REQUEST));
        axios({
            method: 'post',
            url: POST_CREATE_ACCOUNT_API,
            data: postData,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if(response.data.success === true ) {
                    dispatch(actionCreator(LoginActionTypes.post_CreateAccount.SUCCESS, response));
                    dispatch(actionCreator(LoginActionTypes.set_redirectURL.SUCCESS, '/account-created'));
                    history.push('/account-created');
                } else {
                    dispatch(actionCreator(LoginActionTypes.post_CreateAccount.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(LoginActionTypes.post_CreateAccount.FAILURE));
                console.log('error post_CreateAccount ..', error);
            });
    };
};

