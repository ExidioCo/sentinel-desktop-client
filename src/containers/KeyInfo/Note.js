import * as PropTypes from 'prop-types';
import { _mnemonicSaved } from '../../selectors/keys';
import { setKeyMnemonicSaved } from '../../actions/keys';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '../../components/Checkbox';
import React from 'react';

const Note = ({
    id,
}) => {
    const dispatch = useDispatch();
    const mnemonicSaved = useSelector(_mnemonicSaved);

    const handleChange = (event) => {
        dispatch(setKeyMnemonicSaved(event.target.checked));
    };

    return (
        <Checkbox
            checked={mnemonicSaved}
            className="custom-control-input"
            id={id}
            onChange={handleChange}
        />
    );
};

Note.propTypes = {
    id: PropTypes.string,
};

export default Note;
