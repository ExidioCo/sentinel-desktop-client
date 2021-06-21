import globals from './globals';

export const managerBaseURL = () => {
    return `${globals.listenURL}/api/v1`;
};

export const emptyFunc = () => ({});

export const COIN_DENOM = 'TSENT'.toLowerCase();
export const COIN_DISPLAY_DENOM = 'TSENT'.toUpperCase();
export const COIN_DECIMALS = 6;

export const numberInputInvalidKeys = ['-', '+', 'e'];
export const numberInputInvalidKeyCodes = [69, 187, 189];

export const HTTPSURLRegex = /https?/;
