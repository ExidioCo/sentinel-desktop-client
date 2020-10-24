import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const Info = (props) => {
    let dotted = '';
    if (props.dotted) { dotted = 'dotted'; }

    return (
        <div className="Info">
            <div className="Info-label">
                {props.label}
            </div>
            <div className={`Info-value ${dotted}`}>
                {props.value}
            </div>
        </div>
    );
};

Info.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    dotted: PropTypes.bool,
};

export default Info;
