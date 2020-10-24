import React from 'react';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import Info from '../../components/Info';
import SubmitButton from './SubmitButton';

const AccountCreationSuccess = (props) => {
    const onSubmit = (e) => {
        e.preventDefault();
        onClick();
    };

    const onClick = () => {
        // TODO: handle account creation success
        console.log('Route further');
    };

    return (
        <div className="AccountCreationSuccess-container">
            <div className="AccountCreationSuccess-left">
                <Sidebar/>
            </div>

            <div className="AccountCreationSuccess-right">
                <div className="AccountCreationSuccess-main">
                    <div className="AccountCreationSuccess-title">
                        Account Created Successfully!
                    </div>
                    <form
                        id="account_creation_form"
                        onSubmit={onSubmit}>
                        <div>
                            <Info label="ADDRESS" value="cosmosaccaddr1q0sxllakn9eh75nl2cntvfwnegxqfljjmeggj7"/>
                            <Info label="PUBLIC KEY" value="cosmosaccpub1addwnpepqvw3ea6crfamul8a9v3vlle6p2c99cx02ykex9u09r3p72g83w7vxu09k6z"/>
                            <Info dotted={true} label="SEED" value="My seed"/>
                        </div>
                    </form>
                </div>
                <Footer/>
                <SubmitButton onClick={onClick}/>
            </div>
        </div>
    );
};

AccountCreationSuccess.propTypes = {
    AccountAddressValue: PropTypes.string.isRequired,
    AccountPublicKeyValue: PropTypes.string.isRequired,
    AccountSeedValue: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        AccountAddressValue: state.account.AccountAddress,
        AccountPublicKeyValue: state.account.AccountPublicKey,
        AccountSeedValue: state.account.AccountSeed,
    };
};

export default connect(stateToProps)(AccountCreationSuccess);
