import React from 'react';
import Table from '../../../../components/Table';

const columns = [{
    id: 'moniker',
    key: 'moniker',
    label: 'Moniker',
    sort: false,
}, {
    id: 'plan',
    key: 'plan',
    label: 'Plan',
    sort: false,
}, {
    id: 'validity',
    key: 'validity',
    label: 'Validity',
    sort: false,
}, {
    id: 'nodes',
    key: 'nodes',
    label: 'Nodes',
    sort: false,
}, {
    id: 'view-nodes',
    key: 'view-nodes',
    label: 'View Nodes',
    sort: false,
}];

const SubscribedNodeProvidersTable = () => {
    return (
        <>
            <Table
                columns={columns}
                items={[]}
                row={<></>}
                sort={{ by: '', order: '' }}
                onClick={() => {}}
            />
        </>
    );
};

export default SubscribedNodeProvidersTable;
