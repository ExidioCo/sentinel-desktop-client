import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDelegations } from '../../../actions/delegations';
import { getValidators, setValidatorsSort } from '../../../actions/validators';
import Async from 'async';
import Loader from '../../../components/Loader';
import Lodash from 'lodash';
import React, { useEffect, useState } from 'react';
import Row from './Row';
import Table from '../../../components/Table';

const columns = [
    {
        id: '',
        key: 'rank',
        label: '',
        sort: false,
        width: '10%',
    },
    {
        id: 'moniker',
        key: 'description.moniker',
        label: 'Moniker',
        sort: true,
        width: '20%',
    },
    {
        id: 'voting_power',
        key: 'tokens',
        label: 'Voting Power',
        sort: true,
        width: '20%',
    },
    {
        id: 'commission',
        key: 'commission.rate',
        label: 'Commission',
        sort: true,
        width: '15%',
    },
    {
        id: 'delegation',
        key: 'delegation',
        label: 'Delegation',
        sort: false,
        width: '15%',
    },
    {
        id: '',
        key: 'actions',
        label: '',
        sort: false,
        width: '10%',
    },
];

const Validators = ({
    name,
    delegations,
    getDelegations,
    getValidators,
    setValidatorsSort,
    sort,
    status,
    validators,
}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        Async.parallel([
            (next) => getValidators(next),
            (next) => getDelegations(next),
        ], () => {
            setLoading(false);
        });
    }, [name]);

    if (loading) {
        return <Loader/>;
    }

    const filteredValidators = [];
    validators.forEach((validator) => {
        if (status === 1) {
            if (validator.jailed === false && validator.status === 'BOND_STATUS_BONDED') {
                filteredValidators.push(validator);
            }
        } else {
            if (validator.jailed === true || validator.status !== 'BOND_STATUS_BONDED') {
                filteredValidators.push(validator);
            }
        }
    });

    let items = [];
    filteredValidators.forEach((validator) => {
        const delegation = Lodash.find(delegations, ['validator_address', validator['operator_address']]);
        items.push({
            ...validator,
            delegation,
        });
    });

    items = Lodash.orderBy(items, [sort.by], [sort.order]);

    const onClick = (by) => {
        const order = by === sort.by ? sort.order === 'asc' ? 'desc' : 'asc' : 'asc';
        setValidatorsSort({
            by,
            order,
        });
    };

    return (
        <div className="validators-section">
            <Table
                columns={columns}
                items={items}
                row={Row}
                sort={sort}
                onClick={onClick}
            />
        </div>
    );
};

Validators.propTypes = {
    delegations: PropTypes.arrayOf(
        PropTypes.shape({
            validator_address: PropTypes.string.isRequired,
            shares: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    getDelegations: PropTypes.func.isRequired,
    getValidators: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    setValidatorsSort: PropTypes.func.isRequired,
    sort: PropTypes.shape({
        by: PropTypes.string.isRequired,
        order: PropTypes.string.isRequired,
    }).isRequired,
    status: PropTypes.number.isRequired,
    validators: PropTypes.arrayOf(
        PropTypes.shape({
            operator_address: PropTypes.string.isRequired,
            tokens: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
            commission: PropTypes.shape({
                rate: PropTypes.string.isRequired,
                updated_at: PropTypes.string.isRequired,
            }).isRequired,
            description: PropTypes.shape({
                identity: PropTypes.string.isRequired,
                moniker: PropTypes.string.isRequired,
                website: PropTypes.string.isRequired,
            }).isRequired,
            index: PropTypes.number.isRequired,
            jailed: PropTypes.bool.isRequired,
        }).isRequired,
    ).isRequired,
};

const stateToProps = (state) => {
    return {
        delegations: state.delegations.items,
        name: state.keys.name,
        sort: state.validators.sort,
        status: state.validators.status,
        validators: state.validators.items,
    };
};

const actionsToProps = {
    getValidators,
    getDelegations,
    setValidatorsSort,
};

export default connect(stateToProps, actionsToProps)(Validators);
