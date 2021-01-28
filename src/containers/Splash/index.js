import './index.css';
import * as PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Image from '../../components/Image';
import { connect } from 'react-redux';
import { setSplashCompleted } from '../../actions/splash';
import SplashProgressBar from '../../components/ProgressBar';
import textLogo from '../../assets/textLogo.svg';
import TextBox from '../../components/TextBox';

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

    return (
        <div className="splash-container">
            <Image alt="textLogo" src={textLogo}/>
            <SplashProgressBar time={props.completed}/>
            <TextBox className="splash-text f-14 fw-600" value="PREPARING THE SENTINEL CLIENT"/>
        </div>
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
