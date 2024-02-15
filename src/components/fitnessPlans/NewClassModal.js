// this modal is rendered by the HealthDateShow component
// the state that controls this modal, whether it's open or not will live in HealthDateShow
// the state and the updater function for that state will be passed in as a prop from HealthDateShow

import React, { useState } from "react"
import { Modal } from "react-bootstrap"

import ClassForm from "../shared/ClassForm"
import messages from "../shared/AutoDismissAlert/messages"
import { createFitnessPlan } from '../../api/fitnessPlan'

const NewClassModal = (props) => {
    const { healthDate, show, user, handleClose, msgAlert, triggerRefresh } = props
    // const { fitnessPlan, show, handleChange, handleSubmit, heading } = props
    
    // new piece of state, initial value is an empty object
    // we'll build this object out, using our handleChange function
    const [newClass, setNewClass] = useState({})


    const onChange = (evt) => {
        evt.persist()
        setNewClass( prevClass => {
            const updatedName = evt.target.name
            let updatedValue = evt.target.value

            if (updatedName === 'isVirtual' && evt.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isVirtual' && !evt.target.checked) {
                updatedValue = false
            }

            const updatedClass = { [updatedName] : updatedValue }
            return {
                ...prevClass, ...updatedClass
            }
        })
        addFitnessPlanType()
    }

    // API needs to distinguish between class and exercise
    const addFitnessPlanType = () => {
        setNewClass( prevClass => {
            const updatedClass = { type : 'ClassPlan' }
            return {
                ...prevClass, ...updatedClass
            }
        })
    }

    const onSubmit = (evt) => {
        evt.preventDefault()
        addFitnessPlanType()
        createFitnessPlan(healthDate, newClass, user)
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
            .then(() => setNewClass({}))
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
            <Modal.Header closeButton>
                <Modal.Title>Add Class for { healthDate.dateString }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ClassForm 
                    fitnessPlan={newClass}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    handleCancel={handleClose}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewClassModal