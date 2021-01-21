import { WalletActionTypes } from '../constants/index';

const initialState = {
    loading: false,
    loadingValidator: false,
    loadingProposal: false,
    validatorList: null,
    proposalList: null,
    validatorAvatar: null,
    saveDelegate: null,
    saveReDelegate: null,
    accountDetails: null,
    coingekoDetails: null,
    sendTokens: null,
    allDelegations: null,
    postVote: null,
    withdrawRewards: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        // Wallet Reducer
        case WalletActionTypes.get_ValidatorList.REQUEST:
            return {
                ...state,
                loadingValidator: true,
            };
        case WalletActionTypes.get_ValidatorList.SUCCESS:
            return {
                ...state,
                loadingValidator: false,
                validatorList: payload,
            };
        case WalletActionTypes.get_ValidatorList.FAILURE:
            return {
                ...state,
                loadingValidator: false,
            };
        case WalletActionTypes.get_ProposalList.REQUEST:
            return {
                ...state,
                loadingProposal: true,
            };
        case WalletActionTypes.get_ProposalList.SUCCESS:
            return {
                ...state,
                loadingProposal: false,
                proposalList: payload,
            };
        case WalletActionTypes.get_ProposalList.FAILURE:
            return {
                ...state,
                loadingProposal: false,
            };

        // validator avatar    
        case WalletActionTypes.get_ValidatorAvatar.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case WalletActionTypes.get_ValidatorAvatar.SUCCESS:
            return {
                ...state,
                loading: false,
                validatorAvatar: payload,
            };
        case WalletActionTypes.get_ValidatorAvatar.FAILURE:
            return {
                ...state,
                loading: false,
            };

        // save delegate   
        case WalletActionTypes.post_SaveDelegate.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case WalletActionTypes.post_SaveDelegate.SUCCESS:
            return {
                ...state,
                loading: false,
                saveDelegate: payload,
            };
        case WalletActionTypes.post_SaveDelegate.FAILURE:
            return {
                ...state,
                loading: false,
            };

        // save redelegate    
        case WalletActionTypes.post_SaveReDelegate.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case WalletActionTypes.post_SaveReDelegate.SUCCESS:
            return {
                ...state,
                loading: false,
                saveReDelegate: payload,
            };
        case WalletActionTypes.post_SaveReDelegate.FAILURE:
            return {
                ...state,
                loading: false,
            };

        // save unbond    
        case WalletActionTypes.post_SaveUnbond.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case WalletActionTypes.post_SaveUnbond.SUCCESS:
            return {
                ...state,
                loading: false,
                saveUnbond: payload,
            };
        case WalletActionTypes.post_SaveUnbond.FAILURE:
            return {
                ...state,
                loading: false,
            };

        // acount details    
        case WalletActionTypes.get_AnAccountDetails.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case WalletActionTypes.get_AnAccountDetails.SUCCESS:
            return {
                ...state,
                loading: false,
                accountDetails: payload,
            };
        case WalletActionTypes.get_AnAccountDetails.FAILURE:
            return {
                ...state,
                loading: false,
            };

        // get coingeko Details    
        case WalletActionTypes.get_CoingekoDetails.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case WalletActionTypes.get_CoingekoDetails.SUCCESS:
            return {
                ...state,
                loading: false,
                coingekoDetails: payload,
            };
        case WalletActionTypes.get_CoingekoDetails.FAILURE:
            return {
                ...state,
                loading: false,
            };

        // send tokens reducer    
        case WalletActionTypes.post_SendTokens.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case WalletActionTypes.post_SendTokens.SUCCESS:
            return {
                ...state,
                loading: false,
                sendTokens: payload,
            };
        case WalletActionTypes.post_SendTokens.FAILURE:
            return {
                ...state,
                loading: false,
            };

        // Reset Send Token Reducer
        case WalletActionTypes.reset_SendTokenReducer.SUCCESS:
            return {
                ...state,
                sendTokens: payload,
            };

        // all delegations   
        case WalletActionTypes.get_AllDelegations.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case WalletActionTypes.get_AllDelegations.SUCCESS:
            return {
                ...state,
                loading: false,
                allDelegations: payload,
            };
        case WalletActionTypes.get_AllDelegations.FAILURE:
            return {
                ...state,
                loading: false,
            };

        // post vote   
        case WalletActionTypes.post_Vote.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case WalletActionTypes.post_Vote.SUCCESS:
            return {
                ...state,
                loading: false,
                postVote: payload,
            };
        case WalletActionTypes.post_Vote.FAILURE:
            return {
                ...state,
                loading: false,
            };

        // post_WithdrawRewards   
        case WalletActionTypes.post_WithdrawRewards.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case WalletActionTypes.post_WithdrawRewards.SUCCESS:
            return {
                ...state,
                loading: false,
                withdrawRewards: payload,
            };
        case WalletActionTypes.post_WithdrawRewards.FAILURE:
            return {
                ...state,
                loading: false,
            };

        //  resetSaveDelegate   
        case WalletActionTypes.resetSaveDelegate.SUCCESS:
            return {
                ...state,
                loading: false,
                saveDelegate: payload,
            };
        default:
            return state;
    }
};
