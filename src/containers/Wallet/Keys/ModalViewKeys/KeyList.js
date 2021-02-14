import React from 'react';
import Table from './../../../../components/Table';
import Row from './Row';
const columns = [
    {
        id: '',
        key: '',
        label: '',
        sort: false,
    },
    {
        id: 'name',
        key: 'name',
        label: 'name',
        sort: false,
    },
    {
        id: 'address',
        key: 'address',
        label: 'address',
        sort: false,
    },
    {
        id: '',
        key: '',
        label: '',
        sort: false,
    },
    {
        id: '',
        key: '',
        label: '',
        sort: false,
    },
];
const items = [
    {
        name: 'key1',
        address: 'cosmosoer01823081238012830948khasdkfasd343',
    },
    {
        name: 'key2',
        address: 'cosmosoer01823081238012830948khasdkfasd343',
    },
];

export default function KeyList () {
    const onClick = (by) => {

    };
    return (
        <Table
            className="keys-table"
            columns={columns}
            items={items}
            row={Row}
            sort={'sort'}
            onClick={onClick}
        />
    );
}
