import * as PropTypes from 'prop-types';
import React from 'react';

const Checkbox = ({
    className,
    id,
}) => {
    return (
        <input
            className={className}
            id={id}
            type="checkbox"
        />
    );
};

Checkbox.propTypes = {
    className: PropTypes.string.isRequired,
    id: PropTypes.string,
};

export default Checkbox;
