import { Modal } from 'react-bootstrap';
import {
    addNodeProviderSubscription,
    hideAddNodeProviderSubscriptionModal,
} from '../../../../../../actions/subscriptions/addNodeProvider';
import { connect } from 'react-redux';
import Loader from '../../../../../../components/Loader';
import Lodash from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import TextBox from '../../../../../../components/TextBox';
import styles from './index.module.css';

const SubscribeModal = (props) => {
    if (!props.show) {
        return <></>;
    }

    useEffect(() => {
        if (!props.show) {
            return;
        }
        props.subscribe(props.selectedPlan.id);
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
                    value="Subscribe to"
                />
                <a
                    className={styles.providerLink}
                    href={props.selectedProvider.website}
                    rel="noreferrer"
                    target="_blank"
                >
                    {props.selectedProvider.name}
                </a>
            </Modal.Header>
            <Modal.Body>
                {
                    props.inProgress
                        ? (
                            <Loader className={styles.loader} />
                        )
                        : (
                            <div>
                              Status: {props.status.success ? 'Success' : props.status.error.message}
                            </div>
                        )
                }
            </Modal.Body>
        </Modal>
    );
};

SubscribeModal.propTypes = {
    inProgress: PropTypes.bool.isRequired,

    show: PropTypes.bool.isRequired,
    status: PropTypes.shape({
        success: PropTypes.bool.isRequired,
        error: PropTypes.shape({
            code: PropTypes.number,
            message: PropTypes.string,
        }),
    }).isRequired,
    subscribe: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    selectedPlan: PropTypes.shape({
        id: PropTypes.number.isRequired,
        validity: PropTypes.number.isRequired,
        bytes: PropTypes.number.isRequired,
        price: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.number.isRequired,
                denom: PropTypes.string.isRequired,
            }).isRequired,
        ).isRequired,
    }),
    selectedProvider: PropTypes.shape({
        address: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        website: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        planIDs: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    }),
};

const stateToProps = (state) => {
    const { planID, providerAddress } = state.subscriptions.addNodeProvider.params;
    const selectedProvider = Lodash.get(state.providers.items, providerAddress);
    const selectedPlan = Lodash.get(state.plans.items, planID);
    return {
        inProgress: state.subscriptions.addNodeProvider.inProgress,
        status: state.subscriptions.addNodeProvider.status,
        show: state.subscriptions.addNodeProvider.modal,
        selectedProvider,
        selectedPlan,
    };
};

const actionsToProps = {
    onHide: hideAddNodeProviderSubscriptionModal,
    subscribe: addNodeProviderSubscription,
};

export default connect(stateToProps, actionsToProps)(SubscribeModal);
