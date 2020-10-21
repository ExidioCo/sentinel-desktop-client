import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import TextField from '../../components/TextField';
import { setAccountUsername } from '../../actions/application';

const AccountNameField = (props) => {
    return (
        <div className="label_and_field">
            <div className="label">
                ACCOUNT NAME
            </div>
            <div className="field">
                <TextField
                    id="account_name_field"
                    name="account_name"
                    placeholder="Account Username"
                    value={props.value}
                    onChange={props.onChange}/>
            </div>
        </div>
    );
};

AccountNameField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.application.accUsername,
    };
};

const actionsToProps = {
    onChange: setAccountUsername,
};

export default connect(stateToProps, actionsToProps)(AccountNameField);
