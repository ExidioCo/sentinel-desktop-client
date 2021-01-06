
/**
 @desc
 * Centralized unique actions for Wallet Module.
 */

import React from 'react';
import { toast } from 'react-smart-toaster';

import {
    actionCreator,
    jsonApiHeader,
    WalletActionTypes,
    GET_VALIDATOR_LIST_API,
    GET_PROPOSAL_LIST_API
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
                if(response.data.success === true ) {
                    dispatch(actionCreator(WalletActionTypes.get_ValidatorList.SUCCESS, response));
                } else {
                    dispatch(actionCreator(WalletActionTypes.get_ValidatorList.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(WalletActionTypes.get_ValidatorList.FAILURE));
                console.log('error get_ValidatorList ..', error);
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
                if(response.data.success === true ) {
                    dispatch(actionCreator(WalletActionTypes.get_ProposalList.SUCCESS, response));
                } else {
                    dispatch(actionCreator(WalletActionTypes.get_ProposalList.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(WalletActionTypes.get_ProposalList.FAILURE));
                console.log('error get_ProposalList ..', error);
            });
    };
};

