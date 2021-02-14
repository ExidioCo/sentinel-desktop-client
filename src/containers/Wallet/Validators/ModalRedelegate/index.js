import * as PropTypes from 'prop-types';
import { Modal as ReactModal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideTxRedelegateModal } from '../../../../actions/transactions/redelegate';
import Amount from './Amount';
import FromAddress from './FromAddress';
import FromName from './FromName';
import Label from '../../../../components/Label';
import Memo from './Memo';
import Password from './Password';
import React from 'react';
import Redelegate from './Redelegate';
import TextBox from '../../../../components/TextBox';
import ToAddress from './ToAddress';
import ViewPassword from '../../../../components/ViewPassword';

const ModalRedelegate = (props) => {
    return (
        <ReactModal
            animation={false}
            backdrop="static"
            centered={true}
            className="Redelegate-modal"
            keyboard={false}
            show={props.show}
            onHide={props.onHide}>
            <ReactModal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Redelegate From"/>
                <FromName/>
            </ReactModal.Header>
            <ReactModal.Body>
                <div className="flex-item">
                    <Label
                        className=""
                        label="From Address"
                    />
                    <FromAddress/>
                </div>
                <div className="form-group">
                    <Label
                        className=""
                        label="To Address"/>
                    <ToAddress/>
                </div>
                <div className="form-group">
                    <Label
                        className=""
                        label="Amount"
                    />
                    <Amount/>
                </div>
                <div className="form-group">
                    <Label
                        className=""
                        label="Memo"
                    />
                    <Memo/>
                </div>
                <div className="password-box">
                    <div className="form-group">
                        <Label
                            className=""
                            label="Password"
                        />
                        <Password/>
                    </div>
                    <ViewPassword/>
                </div>
                <Redelegate/>
            </ReactModal.Body>
        </ReactModal>
    );
};

ModalRedelegate.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        show: state.transactions.redelegate.modal,
    };
};

const actionsToProps = {
    onHide: hideTxRedelegateModal,
};

export default connect(stateToProps, actionsToProps)(ModalRedelegate);
