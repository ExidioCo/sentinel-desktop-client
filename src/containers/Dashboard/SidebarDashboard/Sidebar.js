import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Icon from '../../../components/Icon';
import React from 'react';
import TextBox from '../../../components/TextBox';

const options = [
    {
        pathname: '/dashboard/dvpn',
        icon: 'lock',
        name: 'dVPN',
    },
    {
        pathname: '/dashboard/wallet',
        icon: 'wallet',
        name: 'Wallet',
    },
];

const Sidebar = ({
    location: { pathname },
}) => {
    return (
        <ul className="list-group">
            {
                options.map((item, index) => (
                    <NavLink
                        key={index}
                        className={pathname === item.pathname ? 'active' : ''}
                        to={item.pathname}>
                        <Icon
                            className="icon"
                            icon={item.icon}
                        />
                        <TextBox
                            className="nav-link-text"
                            value={item.name}
                        />
                    </NavLink>
                ))
            }
        </ul>
    );
};

Sidebar.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
};

export default Sidebar;
