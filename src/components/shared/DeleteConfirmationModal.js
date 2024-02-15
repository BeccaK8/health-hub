import React from 'react'
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmationModal = (props) => {
    const { showModal, handleClose, confirmModal, parentId, id, type, message } = props
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <br />
                <div className="alert alert-danger">{message}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="default" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => confirmModal(type, parentId, id) }>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteConfirmationModal;