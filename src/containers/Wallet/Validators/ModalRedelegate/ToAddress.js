import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTxRedelegateTo } from '../../../../actions/transactions/redelegate';
import AutocompleteSelectField from '../../../../components/AutocompleteSelectField';
import React from 'react';

const ToAddress = (props) => {
    return (
        <AutocompleteSelectField
            className="form-control validators-select"
            items={props.validators}
            menuItemClassName="validator-item"
            value={props.value}
            onChange={props.onChange}
        />
    );
};

ToAddress.propTypes = {
    validators: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
            description: PropTypes.shape({
                moniker: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.transactions.redelegate.to.value,
        validators: state.validators.items,
    };
};

const actionsToProps = {
    onChange: setTxRedelegateTo,
};

export default connect(stateToProps, actionsToProps)(ToAddress);
