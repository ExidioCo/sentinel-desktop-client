import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import Row from './Row';
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
    id: 'usage',
    key: 'usage',
    label: 'Usage',
    sort: false,
}, {
    id: 'connect',
    key: 'connect',
    label: 'Connect',
    sort: false,
}];

const SubscribedIndividualHostsTable = ({
    items,
}) => {
    return (
        <>
            <Table
                columns={columns}
                items={items}
                row={Row}
                sort={{ by: '', order: '' }}
                onClick={() => {}}
            />
        </>
    );
};

SubscribedIndividualHostsTable.propTypes = {
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
        items: Object.values(state.nodes.items).filter((node) => {
            const hasProvider = Object.prototype.hasOwnProperty.call(node, 'provider');
            return !hasProvider;
        }),
    };
};

const actionsToProps = {
};

export default connect(stateToProps, actionsToProps)(SubscribedIndividualHostsTable);
