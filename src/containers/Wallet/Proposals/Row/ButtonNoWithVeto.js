import * as PropTypes from 'prop-types';
import Button from '../../../../components/Button';
import React from 'react';

const ButtonNoWithVeto = (props) => {
    const onClick = () => {
    };

    return (
        <Button
            className="btn button-primary accordion-button"
            disabled={false}
            inProgress={false}
            type="button"
            value="NoWithVeto"
            onClick={onClick}
        />
    );
};

ButtonNoWithVeto.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ButtonNoWithVeto;
