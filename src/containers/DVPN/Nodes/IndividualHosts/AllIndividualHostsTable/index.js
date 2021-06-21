import * as PropTypes from 'prop-types';
import { COIN_DISPLAY_DENOM } from '../../../../../constants/common';
import { connect } from 'react-redux';
import Loader from '../../../../../components/Loader';
import React from 'react';
import Row from './Row';
import SubscribeModal from './SubscribeModal';
import Table from '../../../../../components/Table';

const columns = [{
    id: 'moniker',
    key: 'moniker',
    label: 'Moniker',
    sort: false,
}, {
    id: 'location',
    key: 'location',
    label: 'Location',
    sort: false,
}, {
    id: 'bandwidth',
    key: 'bandwidth',
    label: 'Bandwidth',
    sort: false,
}, {
    id: 'price',
    key: 'price',
    label: `${COIN_DISPLAY_DENOM}/GB`,
    sort: false,
}, {
    id: 'subscribe',
    key: 'subscribe',
    label: 'Subscribe',
    sort: false,
}];

const AllIndividualHostsTable = (props) => {
    if (props.inProgress) {
        return (
            <div className="position-relative">
                <Loader/>
            </div>
        );
    }

    return (
        <>
            <SubscribeModal/>
            <Table
                columns={columns}
                items={props.items}
                row={Row}
                sort={{ by: '', order: '' }}
                onClick={() => {
                }}
            />
        </>
    );
};

AllIndividualHostsTable.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
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
    ).isRequired,
};

const stateToProps = (state) => {
    return {
        items: Object.values(state.nodes.items).filter((node) => node.provider === ''),
        inProgress: state.providers.inProgress,
    };
};

const actionsToProps = {
};

export default connect(stateToProps, actionsToProps)(AllIndividualHostsTable);
