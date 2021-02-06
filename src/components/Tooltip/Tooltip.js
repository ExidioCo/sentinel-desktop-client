import * as PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import './index.css';

const Tooltip = ({
    value,
}) => {
    return (
        <div className="tooltip-section" data-placement="top" data-toggle="tooltip" title={value}>
            <Icon
                className="icon"
                icon="tooltip"
            />
        </div>
    );
};

Tooltip.propTypes = {
    value: PropTypes.string.isRequired,
};

export default Tooltip;
