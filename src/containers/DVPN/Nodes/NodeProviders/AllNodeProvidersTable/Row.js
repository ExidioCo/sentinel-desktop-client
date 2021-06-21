import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    setAddNodeProviderSubscriptionParamsProviderAddress,
} from '../../../../../actions/subscriptions/addNodeProvider';
import Lodash from 'lodash';
import PlanRow from './PlanRow';
import React from 'react';
import Table from '../../../../../components/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styles from './index.module.css';

const columns = [{
    id: 'id',
    key: 'id',
    label: 'ID',
    sort: false,
    width: '10%',
}, {
    id: 'plan',
    key: 'plan',
    label: 'Plan',
    sort: false,
    width: '35%',
}, {
    id: 'validity',
    key: 'validity',
    label: 'Validity',
    sort: false,
    width: '35%',
}, {
    id: 'subscribe',
    key: 'subscribe',
    label: 'Subscribe',
    sort: false,
    width: '20%',
}];

const Row = (props) => {
    const isExpanded = props.selectedProviderAddress === props.item.address;

    return (
        <>
            <TableRow
                key={props.item.address}
                className={styles.row}
            >
                <TableCell width={40}>
                    {props.item.name}
                </TableCell>
                <TableCell width={10}>
                    {props.item.planIDs.length}
                </TableCell>
                <TableCell width={20}>
                    <a
                        href={props.item.website}
                        rel="noopener noreferrer"
                        target="_blank">
                        {props.item.website}
                    </a>
                </TableCell>
                <TableCell width={20}>
                    {props.item.description}
                </TableCell>
                {isExpanded
                    ? (
                        <TableCell
                            className={styles.clickable}
                            width={10}
                            onClick={props.onClose}
                        >
                          Close
                        </TableCell>
                    )
                    : (
                        <TableCell
                            className={styles.clickable}
                            width={10}
                            onClick={() => props.onView(props.item.address)}
                        >
                          View
                        </TableCell>
                    )}
            </TableRow>
            {isExpanded && (
                <TableRow>
                    <TableCell
                        className={styles.nestedTableContainer}
                        colSpan={5}
                    >
                        {props.selectedProviderPlans.length > 0
                            ? (
                                <Table
                                    columns={columns}
                                    items={props.selectedProviderPlans}
                                    row={PlanRow}
                                    sort={{ by: '', order: '' }}
                                    onClick={() => {}}
                                />
                            )
                            : (
                                <div className={styles.noPlans}>No plans available</div>
                            )}
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

Row.propTypes = {
    item: PropTypes.shape({
        address: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        website: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        planIDs: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    selectedProviderAddress: PropTypes.string.isRequired,
    selectedProviderPlans: PropTypes.arrayOf(
        PropTypes.shape({
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
    ).isRequired,
    onClose: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    const selectedProviderAddress = state.subscriptions.addNodeProvider.params.providerAddress;
    let selectedProviderPlans = [];
    if (selectedProviderAddress) {
        const selectedProvider = state.providers.items[selectedProviderAddress];
        selectedProviderPlans = Lodash.at(state.plans.items, selectedProvider.planIDs);
    }
    return {
        selectedProviderAddress,
        selectedProviderPlans,
    };
};

const actionsToProps = (dispatch) => ({
    onView: (providerAddress) => dispatch(setAddNodeProviderSubscriptionParamsProviderAddress(providerAddress)),
    onClose: () => dispatch(setAddNodeProviderSubscriptionParamsProviderAddress('')),
});

export default connect(stateToProps, actionsToProps)(Row);
