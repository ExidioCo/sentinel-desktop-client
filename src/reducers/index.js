import { combineReducers } from 'redux';
import account from './account';
import coingecko from './coingecko';
import configuration from './configuration';
import delegations from './delegations';
import keys from './keys';
import proposals from './proposals';
import sessions from './sessions';
import snackbar from './snackbar';
import splash from './splash';
import status from './status';
import transactions from './transactions';
import validators from './validators';

const root = combineReducers({
    account,
    coingecko,
    configuration,
    delegations,
    keys,
    proposals,
    snackbar,
    sessions,
    splash,
    status,
    transactions,
    validators,
});

export default root;
