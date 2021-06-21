import * as PropTypes from 'prop-types';
import { COIN_DECIMALS } from '../../../../../constants/common';
import { connect } from 'react-redux';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const Row = ({
    item,
    onClick,
}) => {
    const getPrice = () => {
        const coin = item.price[0];
        return coin.value / Math.pow(10, COIN_DECIMALS);
    };

    return (
        <TableRow key={item.address}>
            <TableCell>
                {item.status.moniker}
            </TableCell>
            <TableCell>
                {item.status.location.country}
            </TableCell>
            <TableCell>
                {item.status.bandwidth.download}
            </TableCell>
            <TableCell>
                {getPrice()}
            </TableCell>
            <TableCell onClick={() => onClick(item.address)}>
                <a href="#">Connect</a>
            </TableCell>
        </TableRow>
    );
};

Row.propTypes = {
    item: PropTypes.shape({
        address: PropTypes.string.isRequired,
        price: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.number.isRequired,
                denom: PropTypes.string.isRequired,
            }).isRequired,
        ).isRequired,
        status: PropTypes.shape({
            moniker: PropTypes.string.isRequired,
            bandwidth: PropTypes.shape({
                download: PropTypes.number.isRequired,
            }).isRequired,
            location: PropTypes.shape({
                country: PropTypes.string.isRequired,
            }).isRequired,
        }),
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
    };
};

const actionsToProps = (dispatch) => ({
    onClick: (nodeAddress) => {
    },
});

export default connect(stateToProps, actionsToProps)(Row);
