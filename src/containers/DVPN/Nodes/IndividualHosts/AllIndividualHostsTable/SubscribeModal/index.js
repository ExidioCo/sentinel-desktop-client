import { COIN_DECIMALS, COIN_DISPLAY_DENOM } from '../../../../../../constants/common';
import { Grid } from '@material-ui/core';
import { Modal as ReactModal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideAddIndividualHostSubscriptionModal } from '../../../../../../actions/subscriptions/addIndividualHost';
import Label from '../../../../../../components/Label';
import Lodash from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Subscribe from './Subscribe';
import TextBox from '../../../../../../components/TextBox';
import styles from './index.module.css';

const SubscribeModal = (props) => {
    if (!props.show) {
        return <></>;
    }

    const getPrice = () => {
        const coin = props.selectedNode.price[0];
        return coin.value / Math.pow(10, COIN_DECIMALS);
    };

    return (
        <ReactModal
            animation={false}
            backdrop="static"
            centered={true}
            keyboard={false}
            show={props.show}
            onHide={props.onHide}>
            <ReactModal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Subscribe to"
                />
                <a
                    className={styles.providerLink}
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                >
                    {props.selectedNode.status.moniker}
                </a>
            </ReactModal.Header>
            <ReactModal.Body>
                <Label
                    className=""
                    label="Node Address"
                />
                <TextBox value={props.selectedNode.address} />
                <Grid container>
                    <Grid
                        item
                        xs={6}
                    >
                        <Label label="Bandwidth" />
                        <TextBox value={`${props.selectedNode.status.bandwidth.download}`} />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <Label className="" label={`${COIN_DISPLAY_DENOM}/GB`} />
                        <TextBox value={getPrice().toString()}/>
                    </Grid>
                </Grid>
                <Subscribe />
            </ReactModal.Body>
        </ReactModal>
    );
};

SubscribeModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    selectedNode: PropTypes.shape({
        address: PropTypes.string.isRequired,
        price: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.number.isRequired,
                denom: PropTypes.string.isRequired,
            }).isRequired,
        ).isRequired,
        status: PropTypes.shape({
            moniker: PropTypes.string.isRequired,
            bandwidth: PropTypes.shape({
                download: PropTypes.number.isRequired,
            }).isRequired,
            location: PropTypes.shape({
                country: PropTypes.string.isRequired,
            }).isRequired,
        }),
    }),
};

const stateToProps = (state) => {
    const { nodeAddress } = state.subscriptions.addIndividualHost.params;
    const selectedNode = Lodash.get(state.nodes.items, nodeAddress);
    return {
        show: state.subscriptions.addIndividualHost.modal,
        selectedNode,
    };
};

const actionsToProps = {
    onHide: hideAddIndividualHostSubscriptionModal,
};

export default connect(stateToProps, actionsToProps)(SubscribeModal);
