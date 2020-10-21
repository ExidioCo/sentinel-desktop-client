import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import TextField from '../../components/TextField';
import { setAccountPassword } from '../../actions/application';

const AccountPasswordField = (props) => {
    return (
        <div className="label_and_field">
            <div className="label">
                ACCOUNT PASSWORD
            </div>
            <div className="field">
                <TextField
                    id="account_password_field"
                    name="account_password"
                    placeholder="Password"
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
        value: state.application.accPassword,
    };
};

const actionsToProps = {
    onChange: setAccountPassword,
};

export default connect(stateToProps, actionsToProps)(AccountPasswordField);
