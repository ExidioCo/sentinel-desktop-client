import './index.css';
import * as PropTypes from 'prop-types';
import ProgressBar from '@ramonak/react-progress-bar';
import React from 'react';

const SplashProgressBar = (props) => {
    return (
        <div className="bar-container">
            <ProgressBar
                baseBgColor="rgba(18, 158, 237, 0.15)"
                bgcolor="#129EED"
                borderRadius="0px"
                completed={props.time}
                height="1rem"
                isLableVisible={false}
            />
        </div>
    );
};

SplashProgressBar.propTypes = {
    time: PropTypes.number.isRequired,
};

export default SplashProgressBar;
