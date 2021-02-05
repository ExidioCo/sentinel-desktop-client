import * as PropTypes from 'prop-types';
import React from 'react';
import Label from '../../components/Label';
import Sidebar from '../../components/Sidebar';
import SocialIcons from '../../components/SocialIcons';
import TextBox from '../../components/TextBox';
import Mnemonic from '../../containers/CreateKey/Mnemonic';
import Name from '../../containers/CreateKey/Name';
import Password from '../../containers/CreateKey/Password';
import Submit from '../../containers/CreateKey/Submit';
import './index.css';

const CreateKey = ({ history }) => {
    return (
        <div className="auth-container">
            <div className="col-md-4">
                <Sidebar/>
            </div>
            <div className="col-md-8 account-section">
                <div className="section-body">
                    <TextBox
                        className="title"
                        value="Create Account"
                    />
                    <div className="account-create-row">
                        <div className="form-group">
                            <Label
                                className="label"
                                label="Name"
                            />
                            <Name/>
                        </div>
                        <div className="form-group">
                            <Label
                                className="label"
                                label="Password"
                            />
                            <Password/>
                        </div>
                        <hr/>
                        <div className="form-group">
                            <Label
                                className="label"
                                label="Mnemonic"
                            />
                            <Mnemonic/>
                        </div>
                        <div className="login-footer">
                            <div className="login-button flex-center">
                                <div className="terms flex-center">
                                    <TextBox className="" value="Agree with"/>
                                    <a href="#" target="_blank">Terms & Conditions</a>
                                </div>
                                <Submit history={history}/>
                            </div>
                            <SocialIcons/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CreateKey.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default CreateKey;
