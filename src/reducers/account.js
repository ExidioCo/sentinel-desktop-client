import { combineReducers } from 'redux';
import { ACCOUNT_PASSWORD_SET, ACCOUNT_SEED_SET, ACCOUNT_USERNAME_SET } from '../constants/account';

const AccountUsername = (state = '', action) => {
    switch (action.type) {
    case ACCOUNT_USERNAME_SET:
        return action.value;
    default:
        return state;
    }
};

const AccountPassword = (state = '', action) => {
    switch (action.type) {
    case ACCOUNT_PASSWORD_SET:
        return action.value;
    default:
        return state;
    }
};

const AccountSeed = (state = '', action) => {
    switch (action.type) {
    case ACCOUNT_SEED_SET:
        return action.value;
    default:
        return state;
    }
};

export default combineReducers({
    AccountPassword,
    AccountSeed,
    AccountUsername,
});
