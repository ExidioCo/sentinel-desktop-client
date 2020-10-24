import React from 'react';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import AccountUsernameField from './AccountUsernameField';
import AccountPasswordField from './AccountPasswordField';
import AccountSeedField from './AccountSeedField';
import SubmitButton from './SubmitButton';

const AccountCreation = (props) => {
    const onSubmit = (e) => {
        e.preventDefault();
        onClick();
    };

    const onClick = () => {
        // TODO: handle application authentication
        console.log(props.AccountUsernameValue);
        console.log(props.AccountPasswordValue);
        console.log(props.AccountSeedValue);
    };

    return (
        <div className="AccountCreation-container">
            <div className="AccountCreation-left">
                <Sidebar/>
            </div>

            <div className="AccountCreation-right">
                <div className="AccountCreation-main">
                    <div className="AccountCreation-title">
                        Creating Account
                    </div>
                    <form
                        id="account_creation_form"
                        onSubmit={onSubmit}>
                        <div className="form-group">
                            <AccountUsernameField/>
                            <AccountPasswordField/>
                            <hr/>
                            <AccountSeedField/>
                        </div>
                    </form>
                </div>
                <Footer/>
                <SubmitButton onClick={onClick}/>
            </div>
        </div>
    );
};

AccountCreation.propTypes = {
    AccountPasswordValue: PropTypes.string.isRequired,
    AccountSeedValue: PropTypes.string.isRequired,
    AccountUsernameValue: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        AccountPasswordValue: state.account.AccountPassword,
        AccountUsernameValue: state.account.AccountUsername,
        AccountSeedValue: state.account.AccountSeed,
    };
};

export default connect(stateToProps)(AccountCreation);
