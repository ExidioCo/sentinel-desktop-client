import * as PropTypes from 'prop-types';
import React from 'react';
import NumberInputField from '../../components/NumberInputField';

const GasAdjust = (props) => {
    const onChange = (event) => {
    };

    return (
        <NumberInputField
            className="form-control"
            min={0}
            name="GasAdjust"
            placeholder="Gas Adjust"
            required={true}
            type="number"
            value=""
            onChange={onChange}
        />
    );
};

GasAdjust.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default GasAdjust;
