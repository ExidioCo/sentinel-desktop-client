import './index.css';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

const Spinner = (props) => {
    return (
        <BootstrapSpinner
            animation="grow"
            className={`${props.className} loader`}
        />
    );
};

Spinner.propTypes = {
    className: PropTypes.string,
};

export default React.memo(Spinner);
