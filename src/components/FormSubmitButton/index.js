import React from 'react';
import * as PropTypes from 'prop-types';
import './index.css';

const FormSubmitButton = (props) => {
    return (
        <input
            className="footer_button"
            type="submit"
            value={props.button_name}
            onClick={props.onClick}/>

    );
};

FormSubmitButton.propTypes = {
    button_name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    form_name: PropTypes.string,
};

export default FormSubmitButton;
