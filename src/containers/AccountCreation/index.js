import React from 'react';
import SideLogo from '../../components/SideLogo';
import Footer from '../../components/Footer';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import AccountNameField from './AccountNameField';
import AccountPasswordField from './AccountPasswordField';
import Seed from './Seed';
import SubmitButton from './SubmitButton';

const AccountCreation = (props) => {
    const submitHandler = (e) => {
        e.preventDefault();
        handleAccCreation();
    };

    const handleAccCreation = () => {
        // TODO: handle account creation
    };

    return (
        <div className="form-container">
            <div className="side_bar">
                <SideLogo/>
            </div>

            <div className="right_half">
                <div className="main-section">
                    <div className="form_title">
                        Creating Account
                    </div>
                    <form
                        id="acc_creation_form"
                        onSubmit={submitHandler}>
                        <div className="form-group">
                            <AccountNameField/>
                            <AccountPasswordField/>
                            <hr/>
                            <Seed/>
                        </div>
                    </form>
                </div>
                <Footer/>
                <SubmitButton form_name="acc_creation_form"/>
            </div>
        </div>
    );
};

AccountCreation.propTypes = {
    accPasswordValue: PropTypes.string.isRequired,
    accUsernameValue: PropTypes.string.isRequired,
    seedValue: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        passwordValue: state.application.password,
        accPasswordValue: state.application.accPassword,
        accUsernameValue: state.application.accUsername,
        seedValue: state.application.seed,

    };
};

const actionsToProps = {

};

export default connect(stateToProps, actionsToProps)(AccountCreation);
