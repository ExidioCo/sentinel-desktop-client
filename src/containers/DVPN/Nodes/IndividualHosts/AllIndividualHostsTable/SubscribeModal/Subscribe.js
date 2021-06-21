import * as PropTypes from 'prop-types';
import { addIndividualHostSubscription } from '../../../../../../actions/subscriptions/addIndividualHost';
import { connect } from 'react-redux';
import Button from '../../../../../../components/Button';
import React from 'react';

const Subscribe = (props) => {
    const onClick = () => {
        if (props.inProgress) {
            return;
        }
        props.onClick();
    };

    return (
        <Button
            className="btn button-primary button-large"
            inProgress={props.inProgress}
            type="button"
            value="Subscribe"
            onClick={onClick}
        />
    );
};

Subscribe.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    password: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.subscriptions.addIndividualHost.inProgress,
        password: state.account.password,
    };
};

const actionsToProps = {
    onClick: addIndividualHostSubscription,
};

export default connect(stateToProps, actionsToProps)(Subscribe);
