import { connect } from 'react-redux';
import Loader from '../../../../../components/Loader';
import PropTypes from 'prop-types';
import React from 'react';
import Row from './Row';
import SubscribeModal from './SubscribeModal';
import Table from '../../../../../components/Table';

const columns = [{
    id: 'moniker',
    key: 'moniker',
    label: 'Moniker',
    sort: false,
    width: '30%',
}, {
    id: 'plans',
    key: 'plans',
    label: 'Plans',
    sort: false,
    width: '10%',
}, {
    id: 'website',
    key: 'website',
    label: 'Website',
    sort: false,
    width: '20%',
}, {
    id: 'description',
    key: 'description',
    label: 'Description',
    sort: false,
    width: '30%',
}, {
    id: 'view',
    key: 'view',
    label: '',
    sort: false,
    width: '10%',
}];

const AllNodeProvidersTable = (props) => {
    if (props.inProgress) {
        return (
            <div className="position-relative">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <SubscribeModal />
            <Table
                columns={columns}
                items={props.items}
                row={Row}
                sort={{ by: '', order: '' }}
                onClick={() => {}}
            />
        </>
    );
};

AllNodeProvidersTable.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            website: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            planIDs: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        }).isRequired,
    ).isRequired,
};

const stateToProps = (state) => {
    return {
        items: Object.values(state.providers.items),
        inProgress: state.providers.inProgress,
    };
};

const actionsToProps = {
};

export default connect(stateToProps, actionsToProps)(AllNodeProvidersTable);
