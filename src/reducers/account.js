import { combineReducers } from 'redux';
import {
    ACCOUNT_GET_ERROR,
    ACCOUNT_GET_IN_PROGRESS,
    ACCOUNT_GET_SUCCESS,
    ACCOUNT_PASSWORD_SET,
} from '../constants/account';
import {
    TX_DELEGATE_ERROR,
    TX_DELEGATE_SUCCESS,
    TX_REDELEGATE_ERROR,
    TX_REDELEGATE_SUCCESS,
    TX_SEND_ERROR,
    TX_SEND_SUCCESS,
    TX_UNBOND_ERROR,
    TX_UNBOND_SUCCESS,
    TX_VOTE_ERROR,
    TX_VOTE_SUCCESS,
    TX_WITHDRAW_ERROR,
    TX_WITHDRAW_SUCCESS,
} from '../constants/transactions';

const info = (state = {
    address: '',
    publicKey: '',
    coins: [],
    sequence: 0,
    number: 0,
}, {
    type,
    data,
}) => {
    switch (type) {
    case ACCOUNT_GET_SUCCESS:
        if (data === undefined) {
            return state;
        }

        return {
            ...state,
            address: data.address,
            publicKey: data['pub_key'],
            coins: data.coins,
            sequence: data.sequence,
            number: data.number,
        };
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case ACCOUNT_GET_IN_PROGRESS:
        return true;
    case ACCOUNT_GET_SUCCESS:
    case ACCOUNT_GET_ERROR:
        return false;
    default:
        return state;
    }
};

const password = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case ACCOUNT_PASSWORD_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_DELEGATE_ERROR:
    case TX_DELEGATE_SUCCESS:
    case TX_REDELEGATE_ERROR:
    case TX_REDELEGATE_SUCCESS:
    case TX_SEND_ERROR:
    case TX_SEND_SUCCESS:
    case TX_UNBOND_ERROR:
    case TX_UNBOND_SUCCESS:
    case TX_VOTE_ERROR:
    case TX_VOTE_SUCCESS:
    case TX_WITHDRAW_ERROR:
    case TX_WITHDRAW_SUCCESS:
        return {
            ...state,
            value: '',
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};

export default combineReducers({
    info,
    inProgress,
    password,
});
