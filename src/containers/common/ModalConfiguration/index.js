import * as PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getConfiguration, hideConfigurationModal } from '../../../actions/configuration';
import BroadcastMode from '../../Configuration/BroadcastMode';
import ChainID from '../../Configuration/ChainID';
import Gas from '../../Configuration/Gas';
import GasAdjustment from '../../Configuration/GasAdjustment';
import GasPrices from '../../Configuration/GasPrices';
import LabelWithTooltip from '../../../components/LabelWithTooltip';
import Loader from '../../../components/Loader';
import Password from '../../Configuration/Password';
import RPCAddress from '../../Configuration/RPCAddress';
import React, { useEffect, useState } from 'react';
import SimulateAndExecute from '../../Configuration/SimulateAndExecute';
import Submit from './Submit';
import TextBox from '../../../components/TextBox';
import TrustNode from '../../Configuration/TrustNode';

const ModalConfiguration = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.show === false) {
            setLoading(true);
            return;
        }

        props.getConfiguration(props.history, (error) => {
            if (error) {
                return;
            }

            setLoading(false);
        });
    }, [props.show]);

    return (
        <Modal
            animation={false}
            backdrop="static"
            centered={true}
            keyboard={false}
            show={props.show}
            onHide={props.onHide}>
            <Modal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Configuration"
                />
            </Modal.Header>
            <Modal.Body className="settings-modal">
                {
                    loading
                        ? <Loader/>
                        : <>
                            <div className="row">
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
                                    <div className="form-group">
                                        <LabelWithTooltip label="Trust Node" />
                                        <TrustNode/>
                                    </div>
                                    <div className="form-group">
                                        <LabelWithTooltip label="RPC Address" />
                                        <RPCAddress/>
                                    </div>
                                </div>
                            </div>
                            <Submit hideConfigurationModal={props.onHide}/>
                        </>
                }
            </Modal.Body>
        </Modal>
    );
};

ModalConfiguration.propTypes = {
    getConfiguration: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        show: state.configuration.modal,
    };
};

const actionsToProps = {
    onHide: hideConfigurationModal,
    getConfiguration: getConfiguration,
};

export default connect(stateToProps, actionsToProps)(ModalConfiguration);
