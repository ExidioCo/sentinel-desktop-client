import './index.css';
import * as PropTypes from 'prop-types';
import React from 'react';

const TextBox = (props) => {
    return (
        <p
            className={props.className}
        >
            {props.value}
        </p>
    );
};

TextBox.propTypes = {
    className: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default TextBox;
