import * as PropTypes from 'prop-types';
import { Table as MaterialTable } from '@material-ui/core';
import Header from './Header';
import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import styles from './index.module.css';

const Table = ({
    className,
    columns,
    items,
    onClick,
    sort,
    row: Component,
}) => {
    return (
        <MaterialTable
            aria-label="collapsible table"
            className={`${styles.table} ${className}`}>
            <colgroup>
                {columns.map((column, index) => (
                    <col
                        key={index}
                        style={{ width: column.width }}
                    />
                ))}
            </colgroup>
            <Header
                columns={columns}
                sort={sort}
                onClick={onClick}
            />
            <TableBody>
                {
                    items.map((item, index) => {
                        return (
                            <Component
                                key={index}
                                item={item}
                            />
                        );
                    })
                }
            </TableBody>
        </MaterialTable>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
    items: PropTypes.array.isRequired,
    row: PropTypes.any.isRequired,
    sort: PropTypes.shape({
        by: PropTypes.string.isRequired,
        order: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default Table;
