import * as PropTypes from 'prop-types';
import BroadcastMode from './BroadcastMode';
import ChainID from './ChainID';
import Gas from './Gas';
import GasAdjustment from './GasAdjustment';
import GasPrices from './GasPrices';
import LabelWithTooltip from '../../components/LabelWithTooltip';
import Password from './Password';
import RPCAddress from './RPCAddress';
import React from 'react';
import Sidebar from '../common/SidebarOnboard';
import SimulateAndExecute from './SimulateAndExecute';
import SocialIcons from '../../components/SocialIcons';
import Submit from './Submit';
import TextBox from '../../components/TextBox';
import TrustNode from './TrustNode';

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
                                <LabelWithTooltip label="Application Password" />
                                <Password/>
                            </div>
                            <div className="form-group">
                                <LabelWithTooltip label="Broadcast Mode" />
                                <BroadcastMode/>
                            </div>
                            <div className="form-group">
                                <LabelWithTooltip label="Gas" />
                                <Gas/>
                            </div>
                            <div className="form-group">
                                <LabelWithTooltip label="Gas Adjustment" />
                                <GasAdjustment/>
                            </div>
                            <div className="form-group">
                                <LabelWithTooltip label="Gas Prices" />
                                <GasPrices/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <LabelWithTooltip label="Chain ID" />
                                <ChainID/>
                            </div>
                            <div className="form-group">
                                <LabelWithTooltip label="Simulate And Execute" />
                                <SimulateAndExecute/>
                            </div>
                            <div className="form-group trust-node">
                                <LabelWithTooltip label="Trust Node" />
                                <TrustNode/>
                            </div>
                            <div className="form-group">
                                <LabelWithTooltip label="RPC Address" />
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
