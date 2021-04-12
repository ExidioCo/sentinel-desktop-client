import * as PropTypes from 'prop-types';
import React from 'react';

const Checkbox = ({
    checked,
    id,
    className,
    onChange,
}) => {
    return (
        <input
            checked={checked}
            className={className}
            id={id}
            type="checkbox"
            onChange={onChange}
        />
    );
};

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string,
};

export default Checkbox;
