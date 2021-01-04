import { WalletActionTypes } from '../constants/index';

const initialState = {
    loading: false,
    validatorList: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        // Login Reducer Reducer
        case WalletActionTypes.get_ValidatorList.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case WalletActionTypes.get_ValidatorList.SUCCESS:
            return {
                ...state,
                loading: false,
                validatorList: payload,
            };
        case WalletActionTypes.get_ValidatorList.FAILURE:
            return {
                ...state,
                loading: false,
            };

       
        default:
            return state;
    }
};
