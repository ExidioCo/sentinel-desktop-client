/**
 @desc
 * Centralized unique actions for DVPN Module.
 */

import {toast} from 'react-smart-toaster';

import {
    actionCreator,
    GET_SESSION_OF_AN_ADDRESS_API,
    GET_PROVIDERS_API,
    DvpnActionTypes,
    jsonApiHeader
} from '../constants/index';
import axios from 'axios';


/**
 * @desc Action to get all session fo an address
 */

export const GetSessionOfAnAddressAction = () => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        let address = getState().loginReducer.checkKeysDetails?.data?.result[0].address;
        if (address === undefined) {
            address = getState().loginReducer.createAccount.data.result.address
        }
        let URL = `${GET_SESSION_OF_AN_ADDRESS_API}/${address}/sessions`
        dispatch(actionCreator(DvpnActionTypes.get_SessionOfAnAddress.REQUEST));
        axios({
            method: 'get',
            url: URL,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if (response.data.success === true) {
                    dispatch(actionCreator(DvpnActionTypes.get_SessionOfAnAddress.SUCCESS, response));
                } else {
                    dispatch(actionCreator(DvpnActionTypes.get_SessionOfAnAddress.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(DvpnActionTypes.get_SessionOfAnAddress.FAILURE));
                toast.error(error.message)
            });
    };
};

/**
 * @desc Action to get all providers
 */

export const GetProvidersAction = () => {
    return (dispatch, getState) => {
        let token = getState().loginReducer.loggedInUserDetails.data.result.value;
        let URL = `${GET_PROVIDERS_API}`
        dispatch(actionCreator(DvpnActionTypes.get_Providers.REQUEST));
        axios({
            method: 'get',
            url: URL,
            headers: jsonApiHeader(token),
        })
            .then(function (response) {
                if (response.data.success === true) {
                    dispatch(actionCreator(DvpnActionTypes.get_Providers.SUCCESS, response));
                } else {
                    dispatch(actionCreator(DvpnActionTypes.get_Providers.FAILURE));
                }
            })
            .catch(function (error) {
                dispatch(actionCreator(DvpnActionTypes.get_Providers.FAILURE));
                toast.error(error.message)
            });
    };
};

