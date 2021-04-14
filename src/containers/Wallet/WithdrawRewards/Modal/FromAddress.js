import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { encodeToBech32 } from '../../../../utils/bech32';
import React from 'react';
import TextBox from '../../../../components/TextBox';

const FromAddress = (props) => {
    let address = props.value;
    if (address !== 'All') {
        address = encodeToBech32(address, 'sentvaloper');
    }

    return (
        <TextBox
            className="address"
            value={address}
        />
    );
};

FromAddress.propTypes = {
    value: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.transactions.withdraw.from.value,
    };
};

export default connect(stateToProps)(FromAddress);
