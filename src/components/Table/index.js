import './index.css';
import * as PropTypes from 'prop-types';
import { Table as ReactTable } from '@material-ui/core';
import Header from './Header';
import React from 'react';
import TableBody from '@material-ui/core/TableBody';

const Table = ({
    className,
    columns,
    items,
    onClick,
    sort,
    row: Component,
}) => {
    return (
        <ReactTable aria-label="collapsible table" className={className}>
            <Header
                columns={columns}
                sort={sort}
                onClick={onClick}
            />
            <TableBody>
                {items.map((item, index) => {
                    return (
                        <Component
                            key={index}
                            item={item}
                        />
                    );
                })}
            </TableBody>
        </ReactTable>
    );
};

Table.propTypes = {
    className: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
    items: PropTypes.array.isRequired,
    row: PropTypes.object.isRequired,
    sort: PropTypes.shape({
        by: PropTypes.string.isRequired,
        order: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Table;
