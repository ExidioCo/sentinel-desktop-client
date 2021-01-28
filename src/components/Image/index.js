import * as PropTypes from 'prop-types';
import React from 'react';

const Image = (props) => {
    return (
        <img
            alt={props.alt}
            src={props.src}
        />
    );
};

Image.propTypes = {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
};

export default Image;
