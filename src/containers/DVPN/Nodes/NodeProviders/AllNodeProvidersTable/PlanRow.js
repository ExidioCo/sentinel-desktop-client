import * as PropTypes from 'prop-types';
import { COIN_DECIMALS, COIN_DISPLAY_DENOM } from '../../../../../constants/common';
import { connect } from 'react-redux';
import {
    setAddNodeProviderSubscriptionParamsPlanID,
    showAddNodeProviderSubscriptionModal,
} from '../../../../../actions/subscriptions/addNodeProvider';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import prettyBytes from 'pretty-bytes';

const PlanRow = ({
    item,
    onClick,
}) => {
    const getPrice = () => {
        const coin = item.price[0];
        const amount = coin.value / Math.pow(10, COIN_DECIMALS);
        return `${amount} ${COIN_DISPLAY_DENOM}`;
    };

    return (
        <TableRow key={item.id}>
            <TableCell>
                {item.id}
            </TableCell>
            <TableCell>
                {prettyBytes(item.bytes)} / {getPrice()}
            </TableCell>
            <TableCell>
                {moment.duration(item.validity * 1e-6, 'millisecond').humanize()}
            </TableCell>
            <TableCell onClick={() => onClick(item.id)}>
                <a href="#">Subscribe</a>
            </TableCell>
        </TableRow>
    );
};

PlanRow.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        validity: PropTypes.number.isRequired,
        bytes: PropTypes.number.isRequired,
        price: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.number.isRequired,
                denom: PropTypes.string.isRequired,
            }).isRequired,
        ).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
    };
};

const actionsToProps = (dispatch) => ({
    onClick: (planID) => {
        dispatch(setAddNodeProviderSubscriptionParamsPlanID(planID));
        dispatch(showAddNodeProviderSubscriptionModal());
    },
});

export default connect(stateToProps, actionsToProps)(PlanRow);
