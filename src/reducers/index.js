import { combineReducers } from 'redux';

import loginReducer from '../pages/Login/reducers/LoginReducers';
import walletReducer from '../pages/Dashboard/Wallet/reducers/WalletReducers';

export default combineReducers({
    // all the reducer will be imported here
    loginReducer: loginReducer,
    walletReducer: walletReducer
})