// this modal is rendered by the HealthDateShow component
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

import HealthDateForm from '../shared/HealthDateForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditHealthDateModal = (props) => {

    const { user, show, handleClose, updateHealthDate, msgAlert, triggerRefresh } = props

    const [ healthDate, setHealthDate ] = useState(props.healthDate)

    const onChange = (evt) => {
        evt.persist()

        setHealthDate( prevHealthDate => {
            const updatedName = evt.target.name
            let updatedValue = evt.target.value

            const updatedHealthDate = { [updatedName] : updatedValue }

            return {
                ...prevHealthDate, ...updatedHealthDate
            }
        })
    }

    const onSubmit = (evt) => {
        evt.preventDefault()
        updateHealthDate(user, healthDate)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateHealthDateSuccess,
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <HealthDateForm 
                    healthDate={healthDate}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update your plan..."
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditHealthDateModal