import * as PropTypes from 'prop-types';
import { ValidateMnemonicSaved } from './_validation';
import { _mnemonicSaved } from '../../selectors/keys';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import React from 'react';

const Continue = (props) => {
    const mnemonicSaved = useSelector(_mnemonicSaved);

    const onClick = () => {
        props.history.push('/dashboard/wallet');
    };

    const disabled = (
        ValidateMnemonicSaved(mnemonicSaved).message !== ''
    );

    return (
        <Button
            className="btn button-primary"
            disabled={disabled}
            inProgress={false}
            type="button"
            value="Continue"
            onClick={onClick}
        />
    );
};

Continue.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default Continue;
