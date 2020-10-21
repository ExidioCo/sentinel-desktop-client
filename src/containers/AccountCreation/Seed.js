import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import TextField from '../../components/TextField';
import { setSeed } from '../../actions/application';

const Seed = (props) => {
    return (
        <div className="label_and_field">
            <div className="label">
                ENTER SEED
            </div>
            <div className="field">
                <TextField
                    id="seed"
                    name="seed"
                    placeholder="Enter Seed"
                    type="text"
                    value={props.value}
                    onChange={props.onChange}/>
            </div>
        </div>
    );
};

Seed.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.application.seed,
    };
};

const actionsToProps = {
    onChange: setSeed,
};

export default connect(stateToProps, actionsToProps)(Seed);
