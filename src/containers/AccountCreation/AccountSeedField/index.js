import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import TextField from '../../../components/TextField';
import { setAccountSeed } from '../../../actions/account';
import './index.css';

const AccountSeedField = (props) => {
    return (
        <div className="AccountSeedField">
            <div className="AccountSeedField-label">
                ENTER SEED
            </div>
            <div className="AccountSeedField-field">
                <TextField
                    id="account_seed_field"
                    name="account_seed"
                    placeholder="Enter Seed"
                    type="text"
                    value={props.value}
                    onChange={props.onChange}/>
            </div>
        </div>
    );
};

AccountSeedField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.account.AccountSeed,
    };
};

const actionsToProps = {
    onChange: setAccountSeed,
};

export default connect(stateToProps, actionsToProps)(AccountSeedField);
