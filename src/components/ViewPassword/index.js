import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const ViewPassword = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="password-icon">
            <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={handleClickShowPassword}
            >
                {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </div>
    );
};

export default ViewPassword;
