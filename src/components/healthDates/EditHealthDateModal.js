// this modal is rendered by the HealthDateShow component
import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'

import HealthDateForm from '../shared/HealthDateForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditHealthDateModal = (props) => {

    const { user, show, handleClose, updateHealthDate, msgAlert, triggerRefresh } = props
    console.log('props in edit health date modal = ', props)

    const [ healthDateForm, setHealthDateForm ] = useState(props.healthDate)

    console.log('in edithdmodal -> healthDateForm = ', healthDateForm)
    const [ updated, setUpdated ] = useState(false)

    const handleModalClose = () => {
        setHealthDateForm(props.healthDate)
        handleClose()
    }
    useEffect(() => {
        if (props.healthDate._id === healthDateForm._id) {
            setHealthDateForm(props.healthDate)
        }
    }, [updated])

    console.log('compare hds: ')
    console.log('healthDateForm._id  = ', healthDateForm._id)
    console.log('props.healthDate._id  = ', props.healthDate._id)
    console.log('compare them  = ', props.healthDate._id === healthDateForm._id)
    

    const onChange = (evt) => {
        evt.persist()

        setHealthDateForm( prevHealthDate => {
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
        updateHealthDate(user, healthDateForm)
            .then(() => handleModalClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateHealthDateSuccess,
                    variant: 'success'
                })
            })
            .then(() => setUpdated(prev => !prev))
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
        <Modal show={show} onHide={handleModalClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <HealthDateForm 
                    healthDate={healthDateForm}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update your plan..."
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditHealthDateModal