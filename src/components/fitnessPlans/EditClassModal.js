// this modal is rendered by the FitnessPlanShow component
// the state that controls the modal (whether the modal is open or not) will live in the FitnessPlanShow component (this modal's parent component)
// the state AND updater function associated with that state will be pass here as a prop

import { useState } from 'react'
import { Modal } from 'react-bootstrap'

import ClassForm from '../shared/ClassForm'
import messages from '../shared/AutoDismissAlert/messages'
import { updateFitnessPlan } from '../../api/fitnessPlan'

const EditClassModal = (props) => {

    const { user, show, handleClose, msgAlert, triggerRefresh, healthDate } = props

    const [fitnessPlan, setFitnessPlan] = useState(props.fitnessPlan)

    const onChange = (evt) => {
        evt.persist()
        setFitnessPlan( prevFPlan => {
            const updatedName = evt.target.name
            let updatedValue = evt.target.value

            if (updatedName === 'isVirtual' && evt.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isVirtual' && !evt.target.checked) {
                updatedValue = false
            }

            const updatedFPlan = { [updatedName] : updatedValue }

            return {
                ...prevFPlan, ...updatedFPlan
            }
        })
    }

    const onSubmit = (evt) => {
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ClassForm 
                    fitnessPlan={fitnessPlan}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    handleCancel={handleClose}
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditClassModal