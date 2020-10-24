import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import TextField from '../../../components/TextField';
import { setAccountPassword } from '../../../actions/account';
import './index.css';

const AccountPasswordField = (props) => {
    return (
        <div className="AccountPasswordField">
            <div className="AccountPasswordField-label">
                ACCOUNT PASSWORD
            </div>
            <div className="AccountPasswordField-field">
                <TextField
                    id="account_password_field"
                    name="account_password"
                    placeholder="Password"
                    type="password"
                    value={props.value}
                    onChange={props.onChange}/>
            </div>
        </div>
    );
};

AccountPasswordField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.account.AccountPassword,
    };
};

const actionsToProps = {
    onChange: setAccountPassword,
};

export default connect(stateToProps, actionsToProps)(AccountPasswordField);
