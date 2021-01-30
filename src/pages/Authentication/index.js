import React from 'react';
import Sidebar from '../../components/Sidebar';
import SocialIcons from '../../components/SocialIcons';
import TextBox from '../../components/TextBox';
import PasswordTextField from '../../containers/Authentication/PasswordTextField';
import SubmitButton from '../../containers/Authentication/SubmitButton';
import './index.css';

const Authentication = () => {
    return (
        <div className="auth-container">
            <div className="col-md-4">
                <Sidebar/>
            </div>
            <div className="col-md-8 login-section">
                <div className="login-body">
                    <TextBox
                        className="login-title"
                        value="Authenticate Sentinel Client"
                    />
                    <PasswordTextField/>
                </div>
                <div className="login-footer">
                    <SocialIcons/>
                    <div className="login-button">
                        <SubmitButton/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
