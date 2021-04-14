import * as PropTypes from 'prop-types';
import { ValidateAmount } from './_validation';
import { connect } from 'react-redux';
import { floatCoinFromCoins, validAmountFromInput } from '../../../utils/amount';
import { setTxSendAmount } from '../../../actions/transactions/send';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import NumberInputField from '../../../components/NumberInputField';
import React from 'react';

const Amount = (props) => {
    const amount = floatCoinFromCoins(props.coins);

    const onChange = ({ target: { value } }) => {
        value = validAmountFromInput(amount, props.input.value, value);
        if (value === undefined) {
            return;
        }

        props.onChange({
            value,
            error: ValidateAmount(value),
        });
    };

    const setMaxAmount = () => {
        props.onChange({
            value: amount,
            error: ValidateAmount(amount),
        });
    };

    return (
        <Grid
            container
            alignItems="center"
            justify="space-between"
        >
            <Grid
                item
                xs={10}
            >
                <NumberInputField
                    className="form-control"
                    error={props.input.error}
                    min={0}
                    name="Amount"
                    placeholder="Enter Amount"
                    required={true}
                    type="number"
                    value={props.input.value}
                    onChange={onChange}
                />
            </Grid>
            <Grid
                item
                xs={2}
            >
                <Button onClick={setMaxAmount}>
                    Max
                </Button>
            </Grid>
        </Grid>
    );
};

Amount.propTypes = {
    coins: PropTypes.arrayOf(
        PropTypes.shape({
            denom: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        }).isRequired,
    ).isRequired,
    input: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        coins: state.account.info.coins,
        input: state.transactions.send.amount,
    };
};

const actionsToProps = {
    onChange: setTxSendAmount,
};

export default connect(stateToProps, actionsToProps)(Amount);
