import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import TextField from '../../../components/TextField';
import { setServerID } from '../../../actions/application';
import './index.css';

const ServerIDField = (props) => {
    return (
        <div className="ServerIDField">
            <div className="ServerIDField-label">
                TRUST RPC SERVER
            </div>
            <div className="ServerIDField-field">
                <TextField
                    id="server_id_field"
                    name="ServerID"
                    placeholder="ServerID"
                    type="text"
                    value={props.value}
                    onChange={props.onChange}/>
            </div>
        </div>
    );
};

ServerIDField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.application.ServerID,
    };
};

const actionsToProps = {
    onChange: setServerID,
};

export default connect(stateToProps, actionsToProps)(ServerIDField);
