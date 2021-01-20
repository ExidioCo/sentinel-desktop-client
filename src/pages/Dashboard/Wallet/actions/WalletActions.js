/**
 @desc
 * Centralized unique actions for Wallet Module.
 */

import React from 'react';
import {toast} from 'react-smart-toaster';

import {
    actionCreator,
    GET_ALL_DELEGATIONS_API,
    GET_AN_ACCOUNT_DETAILS_API,
    GET_COINGECKO_DETAILS_API,
    GET_PROPOSAL_LIST_API,
    GET_VALIDATOR_AVATAR_API,
    GET_VALIDATOR_LIST_API,
    jsonApiHeader,
    POST_SAVE_DELEGATE_API,
    POST_SAVE_RE_DELEGATE_API,
    POST_SAVE_UNBOND_API,
    POST_SEND_TOKENS_API,
    POST_VOTE_API,
    POST_WITHDRAW_REWARDS_API,
    WalletActionTypes,
    checkHttpStatus
} from '../constants/index';
import axios from 'axios';


/**
 * @desc Action to get all the validator List
 */

export const GetValidatorListAction = () => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        dispatch(actionCreator(WalletActionTypes.get_ValidatorList.REQUEST));
        axios({
            method: 'get',
            url: GET_VALIDATOR_LIST_API,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if (response.data.success === true) {
                    dispatch(actionCreator(WalletActionTypes.get_ValidatorList.SUCCESS, response));
                } else {
                    dispatch(actionCreator(WalletActionTypes.get_ValidatorList.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(WalletActionTypes.get_ValidatorList.FAILURE));
                checkHttpStatus(error.response);
            });
    };
};

/**
 * @desc Action to get all the proposal List
 */

export const GetProposalListAction = () => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        dispatch(actionCreator(WalletActionTypes.get_ProposalList.REQUEST));
        axios({
            method: 'get',
            url: GET_PROPOSAL_LIST_API,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if (response.data.success === true) {
                    dispatch(actionCreator(WalletActionTypes.get_ProposalList.SUCCESS, response));
                } else {
                    dispatch(actionCreator(WalletActionTypes.get_ProposalList.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(WalletActionTypes.get_ProposalList.FAILURE));
                checkHttpStatus(error.response);

            });
    };
};

/**
 * @desc Action to get all the proposal List
 */

export const GetValidatorAvatarAction = (identity) => {
    return (dispatch, getState) => {
        let URL = `${GET_VALIDATOR_AVATAR_API}?key_suffix=${identity}&fields=pictures`
        dispatch(actionCreator(WalletActionTypes.get_ValidatorAvatar.REQUEST));
        axios({
            method: 'get',
            url: URL,
            headers: {"Content-Type": "application/json"},
        })
            .then(function (response) {
                if (response.data.status.code === 0) {
                    dispatch(actionCreator(WalletActionTypes.get_ValidatorAvatar.SUCCESS, response));
                } else {
                    dispatch(actionCreator(WalletActionTypes.get_ValidatorAvatar.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(WalletActionTypes.get_ValidatorAvatar.FAILURE));
                checkHttpStatus(error.response);

            });
    };
};

/**
 * @desc Action to save delegate
 */

export const PostDelegateAction = (postData) => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        let address = getState().loginReducer.checkKeysDetails?.data?.result[0].address;
        let URL = `${POST_SAVE_DELEGATE_API}/${address}/delegations`
        dispatch(actionCreator(WalletActionTypes.post_SaveDelegate.REQUEST));
        axios({
            method: 'post',
            url: URL,
            data: postData,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if (response.data.success === true) {
                    dispatch(actionCreator(WalletActionTypes.post_SaveDelegate.SUCCESS, response));
                } else {
                    dispatch(actionCreator(WalletActionTypes.post_SaveDelegate.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(WalletActionTypes.post_SaveDelegate.FAILURE));
                checkHttpStatus(error.response);
            });
    };
};

/**
 * @desc Action to save Re-delegate
 */

export const PostReDelegateAction = (postData) => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        let address = getState().loginReducer.checkKeysDetails.data.result[0].address;
        let URL = `${POST_SAVE_RE_DELEGATE_API}/${address}/delegations/redelegate`
        dispatch(actionCreator(WalletActionTypes.post_SaveReDelegate.REQUEST));
        axios({
            method: 'post',
            url: URL,
            data: postData,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if (response.data.success === true) {
                    dispatch(actionCreator(WalletActionTypes.post_SaveReDelegate.SUCCESS, response));
                } else {
                    dispatch(actionCreator(WalletActionTypes.post_SaveReDelegate.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(WalletActionTypes.post_SaveReDelegate.FAILURE));
                checkHttpStatus(error.response);

            });
    };
};

/**
 * @desc Action to save Un-bond
 */

export const PostUnbondAction = (postData) => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        let address = getState().loginReducer.checkKeysDetails?.data?.result[0].address;
        let URL = `${POST_SAVE_UNBOND_API}/${address}/delegations/undelegate`
        dispatch(actionCreator(WalletActionTypes.post_SaveUnbond.REQUEST));
        axios({
            method: 'post',
            url: URL,
            data: postData,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if (response.data.success === true) {
                    dispatch(actionCreator(WalletActionTypes.post_SaveUnbond.SUCCESS, response));
                } else {
                    dispatch(actionCreator(WalletActionTypes.post_SaveUnbond.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(WalletActionTypes.post_SaveUnbond.FAILURE));
                checkHttpStatus(error.response);

            });
    };
};

/**
 * @desc Action to get an account details
 */

export const GetAnAccountDetailsAction = () => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        let address = getState().loginReducer.checkKeysDetails?.data?.result[0].address;
        if (address === undefined) {
            address = getState().loginReducer.createAccount.data.result.address
        }

        let URL = `${GET_AN_ACCOUNT_DETAILS_API}/${address}`
        dispatch(actionCreator(WalletActionTypes.get_AnAccountDetails.REQUEST));
        axios({
            method: 'get',
            url: URL,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if (response.data.success === true) {
                    dispatch(actionCreator(WalletActionTypes.get_AnAccountDetails.SUCCESS, response));
                } else {
                    dispatch(actionCreator(WalletActionTypes.get_AnAccountDetails.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(WalletActionTypes.get_AnAccountDetails.FAILURE));
                checkHttpStatus(error.response);

            });
    };
};


/**
 * @desc Action to get an account details
 */

export const GetCurrencyConversionDetailsAction = () => {
    return (dispatch, getState) => {
        let URL = `${GET_COINGECKO_DETAILS_API}`
        dispatch(actionCreator(WalletActionTypes.get_CoingekoDetails.REQUEST));
        axios({
            method: 'get',
            url: URL,
            headers: {"Content-Type": "application/json"},
        })
            .then(function (response) {
                dispatch(actionCreator(WalletActionTypes.get_CoingekoDetails.SUCCESS, response));
            })
            .catch(function (error) {
                dispatch(actionCreator(WalletActionTypes.get_CoingekoDetails.FAILURE));
                toast.error(JSON.parse(error.message).message)
            });
    };
};

/**
 * @desc Action to send tokens
 */

export const PostSendTokenAction = (postData) => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        let URL = `${POST_SEND_TOKENS_API}`
        dispatch(actionCreator(WalletActionTypes.post_SendTokens.REQUEST));
        axios({
            method: 'post',
            url: URL,
            data: postData,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if (response.data.success === true) {
                    dispatch(actionCreator(WalletActionTypes.post_SendTokens.SUCCESS, response));
                    toast.success('Token Sent Successfully');
                } else {
                    dispatch(actionCreator(WalletActionTypes.post_SendTokens.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(WalletActionTypes.post_SendTokens.FAILURE));
                checkHttpStatus(error.response);
            });
    };
};

/**
 * @desc Action to get all delegations
 */

export const GetAllDelegationsAction = () => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        let address = getState().loginReducer.checkKeysDetails?.data?.result[0].address;
        if (address === undefined) {
            address = getState().loginReducer.createAccount.data.result.address
        }
        let URL = `${GET_ALL_DELEGATIONS_API}/${address}/delegations`
        dispatch(actionCreator(WalletActionTypes.get_AllDelegations.REQUEST));
        axios({
            method: 'get',
            url: URL,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if (response.data.success === true) {
                    dispatch(actionCreator(WalletActionTypes.get_AllDelegations.SUCCESS, response));
                } else {
                    dispatch(actionCreator(WalletActionTypes.get_AllDelegations.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(WalletActionTypes.get_AllDelegations.FAILURE));
                checkHttpStatus(error.response);

            });
    };
};

export const resetSaveDelegate = () => {
    return (dispatch) => {
        dispatch(actionCreator(WalletActionTypes.resetSaveDelegate.SUCCESS, null));
    }
}

/**
 * @desc Action to save Un-bond
 */

export const PostVoteAction = (postData, proposalId) => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        let URL = `${POST_VOTE_API}/${proposalId}/votes`
        dispatch(actionCreator(WalletActionTypes.post_Vote.REQUEST));
        axios({
            method: 'post',
            url: URL,
            data: postData,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if (response.data.success === true) {
                    dispatch(actionCreator(WalletActionTypes.post_Vote.SUCCESS, response));
                    toast.success('Vote saved successfully');
                } else {
                    dispatch(actionCreator(WalletActionTypes.post_Vote.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(WalletActionTypes.post_Vote.FAILURE));
                checkHttpStatus(error.response);
            });
    };
};

/**
 * @desc Action to save Un-bond
 */

export const PostWithdrawRewardsAction = (postData, address) => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        let URL = `${POST_WITHDRAW_REWARDS_API}/${address}/rewards`
        dispatch(actionCreator(WalletActionTypes.post_WithdrawRewards.REQUEST));
        axios({
            method: 'post',
            url: URL,
            data: postData,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if (response.data.success === true) {
                    dispatch(actionCreator(WalletActionTypes.post_WithdrawRewards.SUCCESS, response));
                    toast.success('Withdraw was successfull');
                } else {
                    dispatch(actionCreator(WalletActionTypes.post_WithdrawRewards.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(WalletActionTypes.post_WithdrawRewards.FAILURE));
                checkHttpStatus(error.response);

            });
    };
};

