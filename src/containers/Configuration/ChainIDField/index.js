import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import TextField from '../../../components/TextField';
import { setChainID } from '../../../actions/application';
import './index.css';

const ChainIDField = (props) => {
    return (
        <div className="ChainIDField">
            <div className="ChainIDField-label">
                CHAIN ID
            </div>
            <div className="ChainIDField-field">
                <TextField
                    id="chain_id_field"
                    name="ChainID"
                    placeholder="ChainID"
                    type="text"
                    value={props.value}
                    onChange={props.onChange}/>
            </div>
        </div>
    );
};

ChainIDField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.application.ChainID,
    };
};

const actionsToProps = {
    onChange: setChainID,
};

export default connect(stateToProps, actionsToProps)(ChainIDField);
