import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import TextField from '../../../components/TextField';
import { setAccountUsername } from '../../../actions/account';
import './index.css';

const AccountUsernameField = (props) => {
    return (
        <div className="AccountUsernameField">
            <div className="AccountUsernameField-label">
                ACCOUNT NAME
            </div>
            <div className="AccountUsernameField-field">
                <TextField
                    id="account_username_field"
                    name="account_username"
                    placeholder="Account Username"
                    type="text"
                    value={props.value}
                    onChange={props.onChange}/>
            </div>
        </div>
    );
};

AccountUsernameField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.account.AccountUsername,
    };
};

const actionsToProps = {
    onChange: setAccountUsername,
};

export default connect(stateToProps, actionsToProps)(AccountUsernameField);
