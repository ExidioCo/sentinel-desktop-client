import * as PropTypes from 'prop-types';
import Checkbox from '../../components/Checkbox';
import React from 'react';

const Note = ({
    id,
}) => {
    return (
        <Checkbox
            className="custom-control-input"
            id={id}
        />
    );
};

Note.propTypes = {
    id: PropTypes.string,
};

export default Note;
