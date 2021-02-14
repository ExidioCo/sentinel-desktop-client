import { Modal as ReactModal } from 'react-bootstrap';
import AddKey from './AddKey';
import KeyList from './KeyList';
import React from 'react';
import TextBox from '../../../../components/TextBox';

const ModalViewKeys = () => {
    return (
        <ReactModal
            animation={false}
            backdrop="static"
            centered={true}
            keyboard={false}
            show={true}>
            <ReactModal.Header className="keys-header" closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Keys"
                />
                <AddKey/>
            </ReactModal.Header>
            <ReactModal.Body className="view-key">
                <KeyList/>
            </ReactModal.Body>
        </ReactModal>
    );
};

export default ModalViewKeys;
