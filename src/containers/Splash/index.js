import * as PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setSplashCompleted } from '../../actions/splash';

const Splash = (props) => {
    useEffect(() => {
        if (props.completed === 100) {
            props.history.push('/authentication');
            return;
        }

        setTimeout(() => {
            props.setCompleted(props.completed + 25);
        }, 500);
    });

    const text = 'Loading' + '.'.repeat(props.completed / 25);

    return (
        <span>
            {text}
        </span>
    );
};

Splash.propTypes = {
    completed: PropTypes.number.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    setCompleted: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        completed: state.splash.completed,
    };
};

const actionsToProps = {
    setCompleted: setSplashCompleted,
};

export default connect(stateToProps, actionsToProps)(Splash);
