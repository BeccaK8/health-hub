import React, { useState } from 'react'
import { Modal, Form, Button } from "react-bootstrap"

import { updateFitnessPlan } from '../../api/fitnessPlan'
import messages from '../shared/AutoDismissAlert/messages'

const CompletePlanModal = (props) => {
    const { user, showModal, handleClose, msgAlert, triggerRefresh, healthDate, message } = props

    const [fitnessPlan, setFitnessPlan] = useState(props.fitnessPlan)

    const setBgComplete = (completed) => {
        return (completed) ? ({ backgroundColor: '#FFCCCB' }) : ({ backgroundColor: '#CDFFCD'})
    }

    const handleChange = (evt) => {
        evt.persist()
        setFitnessPlan( prevFPlan => {
            const updatedName = evt.target.name
            let updatedValue = evt.target.value

            if (updatedName === 'completed' && evt.target.checked) {
                updatedValue = true
            } else if (updatedName === 'completed' && !evt.target.checked) {
                updatedValue = false
            }

            const updatedFPlan = { [updatedName] : updatedValue }

            return {
                ...prevFPlan, ...updatedFPlan
            }
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        updateFitnessPlan(user, healthDate, fitnessPlan)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateFitnessPlanSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(err => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>

                <Modal.Header closeButton>
                    <Modal.Title>Complete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-complete p-2" style={setBgComplete(fitnessPlan.completed)}>
                        <Form.Group>
                            <Form.Check 
                                label={message}
                                name="completed"
                                defaultChecked={ fitnessPlan.completed }
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='card-btn-group-end'>
                        <Button variant="default" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="success" type="submit">
                            Save
                        </Button>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default CompletePlanModal;