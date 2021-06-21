import './index.css';
import * as PropTypes from 'prop-types';
import React from 'react';

const TextBox = ({
    className,
    value,
}) => {
    return (
        <p className={className}>
            {value}
        </p>
    );
};

TextBox.propTypes = {
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default React.memo(TextBox);
