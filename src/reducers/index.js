import { combineReducers } from 'redux';
import account from './account';
import coingecko from './coingecko';
import configuration from './configuration';
import delegations from './delegations';
import keys from './keys';
import nodes from './nodes';
import plans from './plans';
import proposals from './proposals';
import providers from './providers';
import sessions from './sessions';
import snackbar from './snackbar';
import splash from './splash';
import status from './status';
import subscriptions from './subscriptions';
import transactions from './transactions';
import ui from './ui';
import validators from './validators';

const root = combineReducers({
    account,
    coingecko,
    configuration,
    delegations,
    keys,
    nodes,
    plans,
    proposals,
    providers,
    snackbar,
    sessions,
    splash,
    status,
    subscriptions,
    transactions,
    ui,
    validators,
});

export default root;
