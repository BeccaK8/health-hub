// this modal is rendered by the HealthDateShow component
// the state that controls this modal, whether it's open or not will live in HealthDateShow
// the state and the updater function for that state will be passed in as a prop from HealthDateShow

import React, { useState } from "react"
import { Modal } from "react-bootstrap"

import ExerciseForm from "../shared/ExerciseForm"
import messages from "../shared/AutoDismissAlert/messages"
import { createFitnessPlan } from '../../api/fitnessPlan'

const NewExerciseModal = (props) => {
    const { healthDate, show, user, handleClose, msgAlert, triggerRefresh } = props

    const [newExercise, setNewExercise] = useState({})

    const onChange = (evt) => {
        evt.persist()
        setNewExercise( prevExer => {
            const updatedName = evt.target.name
            let updatedValue = evt.target.value

            if (evt.target.type === 'number' && evt.target.value && evt.target.value.length > 0) {
                updatedValue = parseInt(evt.target.value)
            }

            const updatedExer = { [updatedName] : updatedValue }
            return {
                ...prevExer, ...updatedExer
            }
        })
        addFitnessPlanType()
    }

    // API needs to distinguish between class and exercise
    const addFitnessPlanType = () => {
        setNewExercise( prevExer => {
            const updatedExer = { type : 'ExercisePlan' }
            return {
                ...prevExer, ...updatedExer
            }
        })
    }

    const onSubmit = (evt) => {
        evt.preventDefault()
        addFitnessPlanType()
        createFitnessPlan(healthDate, newExercise, user)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createFitnessPlanSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // set new class back to initial state to clear out form
            .then(() => setNewExercise({}))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ExerciseForm 
                    fitnessPlan={newExercise}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Add an exercise for ${ healthDate.dateString }`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewExerciseModal