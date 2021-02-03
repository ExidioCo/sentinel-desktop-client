import * as PropTypes from 'prop-types';
import React from 'react';
import TextInputField from '../../components/TextInputField';

const GasPrice = (props) => {
    const onChange = (event) => {
    };

    return (
        <TextInputField
            className="form-control"
            name="GasPrice"
            placeholder="Enter Price"
            required={true}
            type="text"
            value=""
            onChange={onChange}
        />
    );
};

GasPrice.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default GasPrice;
