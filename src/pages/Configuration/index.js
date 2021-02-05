import * as PropTypes from 'prop-types';
import React from 'react';
import Label from '../../components/Label';
import Sidebar from '../../components/Sidebar';
import SocialIcons from '../../components/SocialIcons';
import TextBox from '../../components/TextBox';
import BroadcastMode from '../../containers/Configuration/BroadcastMode';
import ChainID from '../../containers/Configuration/ChainID';
import Fee from '../../containers/Configuration/Fee';
import Gas from '../../containers/Configuration/Gas';
import GasAdjustment from '../../containers/Configuration/GasAdjustment';
import GasPrices from '../../containers/Configuration/GasPrices';
import RPCAddress from '../../containers/Configuration/RPCAddress';
import SimulateAndExecute from '../../containers/Configuration/SimulateAndExecute';
import Submit from '../../containers/Configuration/Submit';
import TrustNode from '../../containers/Configuration/TrustNode';
import Tooltip from '../../components/Tooltip/Tooltip';
import './index.css';

const Configuration = ({ history }) => {
    return (
        <div className="auth-container">
            <div className="col-md-4">
                <Sidebar/>
            </div>
            <div className="col-md-8 account-section">
                <div className="section-body">
                    <TextBox className="login-title" value="Configuration"/>
                    <div className="config-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Broadcast Mode"
                                    />
                                    <Tooltip value="Help"/>
                                </div>
                                <BroadcastMode/>
                            </div>
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Fee"
                                    />
                                    <Tooltip value="Help"/>
                                </div>
                                <Fee/>
                            </div>
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Gas"
                                    />
                                    <Tooltip value="Help"/>
                                </div>
                                <Gas/>
                            </div>
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Gas Adjustment"
                                    />
                                    <Tooltip value="Help"/>
                                </div>
                                <GasAdjustment/>
                            </div>
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Gas Price"
                                    />
                                    <Tooltip value="Help"/>
                                </div>
                                <GasPrices/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Chain ID"
                                    />
                                    <Tooltip value="Help"/>
                                </div>
                                <ChainID/>
                            </div>
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Simulate And Execute"
                                    />
                                    <Tooltip value="Help"/>
                                </div>
                                <SimulateAndExecute/>
                            </div>
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Trust Node"
                                    />
                                    <Tooltip value="Help"/>
                                </div>
                                <TrustNode/>
                            </div>
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="RPC Address"
                                    />
                                    <Tooltip value="Help"/>
                                </div>
                                <RPCAddress/>
                            </div>
                        </div>
                        <div className="login-footer">
                            <div className="login-button">
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

Configuration.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default Configuration;
