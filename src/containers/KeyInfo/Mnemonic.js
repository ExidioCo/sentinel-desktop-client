import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import TextBox from '../../components/TextBox';

const Mnemonic = (props) => {
    return (
        <TextBox
            className="value seed"
            value={props.value}
        />
    );
};

Mnemonic.propTypes = {
    value: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.keys.post.info.mnemonic,
    };
};

export default connect(stateToProps)(Mnemonic);
