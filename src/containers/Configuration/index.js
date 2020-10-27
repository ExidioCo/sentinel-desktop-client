import React from 'react';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import ChainIDField from './ChainIDField';
import RPCServerAddressField from './RPCServerAddressField';
import SubmitButton from './SubmitButton';
import ServerIDField from './ServerIDField';

const Configuration = (props) => {
    const onSubmit = (e) => {
        e.preventDefault();
        onClick();
    };

    const onClick = () => {
        // TODO: handle application configuration
        console.log(props.ChainIDValue);
        console.log(props.ServerIDValue);
        console.log(props.RPCServerAddressValue);
    };

    return (
        <div className="Configuration-container">
            <div className="Configuration-left">
                <Sidebar/>
            </div>
            <div className="Configuration-right">
                <div className="Configuration-main">
                    <div className="Configuration-title">
                        Configure Settings
                    </div>
                    <form
                        id="config_form"
                        onSubmit={onSubmit}>
                        <ChainIDField/>
                        <ServerIDField/>
                        <RPCServerAddressField/>
                    </form>
                </div>
                <Footer/>
                <SubmitButton onClick={onClick}/>
            </div>
        </div>
    );
};

Configuration.propTypes = {
    ChainIDValue: PropTypes.string.isRequired,
    RPCServerAddressValue: PropTypes.string.isRequired,
    ServerIDValue: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        ChainIDValue: state.application.ChainID,
        RPCServerAddressValue: state.application.RPCServerAddress,
        ServerIDValue: state.application.ServerID,
    };
};

export default connect(stateToProps)(Configuration);
