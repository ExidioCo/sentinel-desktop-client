import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const Button = ({
    className,
    value,
}) => {
    return (
        <button className={className}>
            {value}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default Button;
