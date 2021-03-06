import * as PropTypes from 'prop-types';
import { ValidateAmount, ValidateTo } from './_validation';
import { connect } from 'react-redux';
import { showTxSendModal } from '../../../actions/transactions/send';
import Button from '../../../components/Button';
import React from 'react';

const Send = (props) => {
    const disabled = (
        ValidateAmount(props.amount.value).message !== '' ||
        ValidateTo(props.to.value).message !== ''
    );

    return (
        <Button
            className="btn button-primary button-large"
            disabled={disabled}
            inProgress={false}
            type="button"
            value="Send"
            onClick={props.onClick}
        />
    );
};

Send.propTypes = {
    amount: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    to: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        amount: state.transactions.send.amount,
        to: state.transactions.send.to,
    };
};

const actionsToProps = {
    onClick: showTxSendModal,
};

export default connect(stateToProps, actionsToProps)(Send);
