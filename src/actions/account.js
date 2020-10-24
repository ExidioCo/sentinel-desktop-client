import { ACCOUNT_PASSWORD_SET, ACCOUNT_SEED_SET, ACCOUNT_USERNAME_SET } from '../constants/account';

export const setAccountUsername = (value) => {
    return {
        type: ACCOUNT_USERNAME_SET,
        value,
    };
};

export const setAccountPassword = (value) => {
    return {
        type: ACCOUNT_PASSWORD_SET,
        value,
    };
};

export const setAccountSeed = (value) => {
    return {
        type: ACCOUNT_SEED_SET,
        value,
    };
};
