import './index.css';
import * as PropTypes from 'prop-types';
import Collapse from '../../../assets/Collapse.svg';
import ExidioLogo from '../../../assets/Exidio.svg';
import Image from '../../../components/Image';
import Keys from './Keys';
import React from 'react';
import Sidebar from './Sidebar';
import TextBox from '../../../components/TextBox';

const SidebarDashboard = (props) => {
    const toggleClass = () => {
        if (document.getElementById('side-bar').classList.contains('active')) {
            document.getElementById('side-bar').classList.remove('active');
        } else {
            document.getElementById('side-bar').classList.add('active');
        }
    };

    return (
        <div
            className="dashboard-side-bar-container"
            id="side-bar">
            <div
                className="toggle-section"
                onClick={toggleClass}>
                <Image
                    alt="collapse-icon"
                    className="collapse-icon"
                    src={Collapse}
                />
            </div>
            <div className="settings-dropdown">
                <Keys history={props.history}/>
            </div>
            <div className="side-bar-list">
                <Sidebar location={props.location}/>
            </div>
            <div className="build-by">
                <TextBox
                    className="build-text"
                    value="Built by"
                />
                <Image
                    alt="Exidio Logo"
                    className="exidio-logo"
                    src={ExidioLogo}/>
            </div>
        </div>
    );
};

SidebarDashboard.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
};

export default SidebarDashboard;
