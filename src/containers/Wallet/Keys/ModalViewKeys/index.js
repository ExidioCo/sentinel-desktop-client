import { Modal as ReactModal } from 'react-bootstrap';
import Add from './Add';
import KeyList from './List';
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
            <ReactModal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Keys"
                />
            </ReactModal.Header>
            <ReactModal.Body className="view-key">
                <Add/>
                <hr/>
                <KeyList/>
            </ReactModal.Body>
        </ReactModal>
    );
};

export default ModalViewKeys;
