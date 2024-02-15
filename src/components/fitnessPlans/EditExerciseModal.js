// this modal is rendered by the FitnessPlanShow component
// the state that controls the modal (whether the modal is open or not) will live in the FitnessPlanShow component (this modal's parent component)
// the state AND updater function associated with that state will be pass here as a prop

import { useState } from 'react'
import { Modal } from 'react-bootstrap'

import ExerciseForm from '../shared/ExerciseForm'
import messages from '../shared/AutoDismissAlert/messages'
import { updateFitnessPlan } from '../../api/fitnessPlan'

const EditExerciseModal = (props) => {
    // pull important things from props
    const { user, show, handleClose, msgAlert, triggerRefresh, healthDate } = props

    const [fitnessPlan, setFitnessPlan] = useState(props.fitnessPlan)

    const onChange = (evt) => {
        evt.persist()
        setFitnessPlan( prevFPlan => {
            const updatedName = evt.target.name
            let updatedValue = evt.target.value

            if (evt.target.type === 'number' && evt.target.value && evt.target.value.length > 0) {
                updatedValue = parseInt(evt.target.value)
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
                <Modal.Title>Update Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ExerciseForm 
                    fitnessPlan={fitnessPlan}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    handleCancel={handleClose}
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditExerciseModal