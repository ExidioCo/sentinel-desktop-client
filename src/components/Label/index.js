import './index.css';
import * as PropTypes from 'prop-types';
import React from 'react';

const Label = ({
    className,
    label,
}) => {
    return (
        <label className={className}>
            {label}
        </label>
    );
};

Label.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default React.memo(Label);
