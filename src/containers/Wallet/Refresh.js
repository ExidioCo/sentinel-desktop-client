import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
const Refresh = () => {
    const onClick = () => {
    };

    return (
        <IconButton className="refresh-button" onClick={onClick}>
            <RefreshIcon/>
        </IconButton>
    );
};

export default Refresh;
