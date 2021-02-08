import * as PropTypes from 'prop-types';
import React from 'react';
import { Modal as ReactModal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideTxVoteModal } from '../../../../actions/transactions/vote';
import Label from '../../../../components/Label';
import TextBox from '../../../../components/TextBox';
import Memo from './Memo';
import Password from './Password';
import Vote from './Vote';

const Modal = ({
    show,
    onHide,
}) => {
    return (
        <ReactModal
            animation={false}
            backdrop="static"
            centered={true}
            keyboard={false}
            show={show}
            onHide={onHide}>
            <ReactModal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Voting abstain"
                />
            </ReactModal.Header>
            <ReactModal.Body>
                <div className="form-group">
                    <Label
                        className=""
                        label="Memo"
                    />
                    <Memo/>
                </div>
                <div className="form-group">
                    <Label
                        className=""
                        label="Password"
                    />
                    <Password/>
                </div>
                <Vote/>
            </ReactModal.Body>
        </ReactModal>
    );
};

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        show: state.transactions.vote.modal,
    };
};

const actionsToProps = {
    onHide: hideTxVoteModal,
};

export default connect(stateToProps, actionsToProps)(Modal);
