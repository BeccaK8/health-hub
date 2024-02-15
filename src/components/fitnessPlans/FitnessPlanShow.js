import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faTrash, faX } from '@fortawesome/free-solid-svg-icons'

import { updateFitnessPlan, removeFitnessPlan } from '../../api/fitnessPlan'
import messages from '../shared/AutoDismissAlert/messages'
import DeleteConfirmationModal from '../shared/DeleteConfirmationModal'
import EditClassModal from './EditClassModal'
import EditExerciseModal from './EditExerciseModal'
import CompletePlanModal from './CompletePlanModal'

const setBgCondition = (completed, planType) => {
    if (completed) {
        return ({backgroundColor: '#91C499'})
    } else if (planType === 'ClassPlan') {
        return ({backgroundColor: '#cbc6dd'})
    } else if (planType === 'ExercisePlan') {
        return ({backgroundColor: '#f0f1ba'})
    } else { 
        return ({})
    }
}

const FitnessPlanShow = (props) => {

    const { user, healthDate, msgAlert, triggerRefresh, isPlannable, isTrackable } = props

    const [fitnessPlan, setFitnessPlan] = useState(props.fitnessPlan)
    const [updated, setUpdated] = useState(false)
    const [editClassModalShow, setEditClassModalShow] = useState(false)
    const [editExerciseModalShow, setEditExerciseModalShow] = useState(false)
    const [completePlanModalShow, setCompletePlanModalShow] = useState(false)
    const [deleteModalShow, setDeleteModalShow] = useState(false)

    // Handle Complete Fitness Plan
    const updateCompleted = () => {
        console.log('made it to updateCompleted()')
        setFitnessPlan( prevClass => {
            const updatedClass = { completed : true }
            return {
                ...prevClass, ...updatedClass
            }
        })
        setUpdated(prev => !prev)
    }

    const completeFitnessPlan = () => {
        console.log('fitnessPlan can be completed = ', fitnessPlan)
        updateFitnessPlan(user, healthDate, fitnessPlan)
            .then(() => setCompletePlanModalShow(false))
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

    // Handle Delete
    const clearFitnessPlan = () => {
        removeFitnessPlan(user, healthDate._id, fitnessPlan._id)
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deleteFitnessPlanSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className='m-2' key={ fitnessPlan._id }>
                <Card.Header style={setBgCondition(fitnessPlan.completed, fitnessPlan.type)}>
                    {fitnessPlan.name}
                    {
                        fitnessPlan.completed
                        ?
                        <div className='d-inline-block'>
                            &nbsp; &nbsp;
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                className="text-dark cursor" 
                                title="Plan Completed!"
                            />

                        </div>
                        :
                        <></>
                    }
                </Card.Header>
                <Card.Body>
                    {
                        fitnessPlan.type === 'ClassPlan'
                        ?
                        <>
                            <small>Host: { fitnessPlan.host }</small>
                            {
                                fitnessPlan.location
                                ? 
                                <small>Location: { fitnessPlan.location }</small>
                                :
                                <></>
                            }
                            {
                                fitnessPlan.time
                                ?
                                <small>Time: { fitnessPlan.time }</small>
                                :
                                <></>
                            }
                            {
                                fitnessPlan.isVirtual
                                ?
                                <>
                                    <small>Virtual</small>
                                </>
                                :
                                <></>
                            }
                        </>
                    :
                        <>
                            {
                                fitnessPlan.reps
                                ?
                                    <small>Reps: { fitnessPlan.reps }</small>

                                :
                                <></>
                            }
                            {
                                fitnessPlan.sets
                                ?
                                    <small>Sets: { fitnessPlan.sets }</small>
                                :
                                <></>
                            }
                        </>
                }
                </Card.Body>
                        <Card.Footer>
                            {
                                isPlannable || isTrackable
                                ?
                                <div className='card-btn-group'>
                                {
                                    isTrackable
                                    ?
                                    <>
                                        {
                                            fitnessPlan.completed
                                            ?
                                                <FontAwesomeIcon 
                                                    icon={faX} 
                                                    className="text-danger cursor" 
                                                    onClick={() => setCompletePlanModalShow(true)}
                                                />
                                            :
                                                <FontAwesomeIcon 
                                                    icon={faCheck} 
                                                    className="text-success cursor" 
                                                    onClick={() => setCompletePlanModalShow(true)}
                                                />

                                        }
                                        {
                                            isPlannable
                                            ?
                                            <>&nbsp; &nbsp;</>
                                            :
                                            <></>
                                        }
                                        
                                    </>
                                    :
                                    <></>
                                }
                                {
                                    isPlannable
                                    ?
                                    <>
                                        <FontAwesomeIcon 
                                            icon={faEdit} 
                                            className="text-dark cursor" 
                                            onClick={() => 
                                                (fitnessPlan.type === 'ClassPlan')
                                                ? setEditClassModalShow(true)
                                                : setEditExerciseModalShow(true)
                                            }
                                            />
                                        &nbsp; &nbsp;
                                        <FontAwesomeIcon 
                                            icon={faTrash} 
                                            className="text-danger cursor" 
                                            onClick={() => setDeleteModalShow(true)} 
                                            />
                                    </>
                                    :
                                    <></>
                                }
                                </div>
                                :
                                <></>
                            }
                </Card.Footer>
            </Card>
            <EditClassModal
                user={user}
                healthDate={healthDate}
                fitnessPlan={fitnessPlan}
                show={editClassModalShow}
                handleClose={() => setEditClassModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
            <EditExerciseModal
                user={user}
                healthDate={healthDate}
                fitnessPlan={fitnessPlan}
                show={editExerciseModalShow}
                handleClose={() => setEditExerciseModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
            <CompletePlanModal 
                user={user}
                fitnessPlan={fitnessPlan}
                showModal={completePlanModalShow}
                handleClose={() => setCompletePlanModalShow(false)}
                msgAlert={msgAlert}
                healthDate={healthDate}
                triggerRefresh={triggerRefresh}
                alertClass={
                    fitnessPlan.completed
                    ? 'danger'
                    : 'success'
                }
                message={
                    fitnessPlan.completed 
                    ? `Uncheck if you did not complete ${ fitnessPlan.name }`
                    : `Check if you completed ${ fitnessPlan.name }`}
            />
            <DeleteConfirmationModal 
                showModal={deleteModalShow}
                confirmModal={clearFitnessPlan}
                handleClose={() => setDeleteModalShow(false)}
                message={`Are you sure you want to delete ${ fitnessPlan.name }?`}
            />
        </>
    )
}

export default FitnessPlanShow