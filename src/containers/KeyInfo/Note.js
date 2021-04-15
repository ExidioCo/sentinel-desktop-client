import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setKeyMnemonicSaved } from '../../actions/keys';
import Checkbox from '../../components/Checkbox';
import React from 'react';

const Note = ({
    id,
    isMnemonicSaved,
    onChange,
}) => {
    const handleChange = (event) => {
        onChange(event.target.checked);
    };

    return (
        <Checkbox
            checked={isMnemonicSaved}
            className="custom-control-input"
            id={id}
            onChange={handleChange}
        />
    );
};

Note.propTypes = {
    id: PropTypes.string.isRequired,
    isMnemonicSaved: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        isMnemonicSaved: state.keys.post.mnemonic.saved,
    };
};

const actionsToProps = {
    onChange: setKeyMnemonicSaved,
};

export default connect(stateToProps, actionsToProps)(Note);
