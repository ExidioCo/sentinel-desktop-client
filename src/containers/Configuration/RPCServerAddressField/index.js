import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import TextField from '../../../components/TextField';
import { setRPCServerAddress } from '../../../actions/application';
import './index.css';

const RPCServerAddressField = (props) => {
    return (
        <div className="RPCServerAddressField">
            <div className="RPCServerAddressField-label">
                RPC SERVER ADDRESS
            </div>
            <div className="RPCServerAddressField-field">
                <TextField
                    id="rpc_server_address_field"
                    name="RPCServerAddress"
                    placeholder="RPC Address"
                    type="text"
                    value={props.value}
                    onChange={props.onChange}/>
            </div>
        </div>
    );
};

RPCServerAddressField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.application.RPCServerAddress,
    };
};

const actionsToProps = {
    onChange: setRPCServerAddress,
};

export default connect(stateToProps, actionsToProps)(RPCServerAddressField);
