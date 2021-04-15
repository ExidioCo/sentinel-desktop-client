import * as PropTypes from 'prop-types';
import { ValidateMnemonicSaved } from './_validation';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import React from 'react';

const Continue = (props) => {
    const onClick = () => {
        props.history.push('/dashboard/wallet');
    };

    const disabled = (
        ValidateMnemonicSaved(props.isMnemonicSaved).message !== ''
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
    isMnemonicSaved: PropTypes.bool.isRequired,
};

const stateToProps = (state) => {
    return {
        isMnemonicSaved: state.keys.post.mnemonic.saved,
    };
};

export default connect(stateToProps, null)(Continue);
