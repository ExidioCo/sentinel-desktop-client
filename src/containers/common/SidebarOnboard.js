import Image from '../../components/Image';
import Logo from '../../assets/Logo.svg';
import React from 'react';
import TextBox from '../../components/TextBox';

const SidebarOnboard = () => {
    return (
        <div className="side-bar">
            <Image
                alt="Logo"
                className="side-bar-logo"
                src={Logo}
            />
            <div className="side-bar-bottom">
                <TextBox
                    className="side-bar-text-logo"
                    value="SENTINEL"
                />
                <TextBox
                    className="side-bar-text"
                    value="The leader in transparent, end-to-end encrypted VPN technology"
                />
                <TextBox
                    className="side-bar-version-text"
                    value={`v${process.env.REACT_APP_VERSION}`}
                />
            </div>
        </div>
    );
};

export default SidebarOnboard;
