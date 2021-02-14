import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const SelectKey = () => {
    return (
        <Tooltip title="Select">
            <IconButton size="small">
                <CheckCircleIcon/>
            </IconButton>
        </Tooltip>
    );
};

export default SelectKey;
