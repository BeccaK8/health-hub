import { useState, useEffect } from 'react'
import { Card, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit ,faTrash } from '@fortawesome/free-solid-svg-icons'

import { get_formatted_health_date } from "../../lib/health_date_helper_functions"
import HealthDateForm from "../shared/HealthDateForm"
import { createHealthDate, updateHealthDate, removeHealthDate } from '../../api/healthDate'
import messages from '../shared/AutoDismissAlert/messages'
import EditHealthDateModal from './EditHealthDateModal'
import DeleteConfirmationModal from '../shared/DeleteConfirmationModal'
import FitnessPlanShow from '../fitnessPlans/FitnessPlanShow'
import NewClassModal from '../fitnessPlans/NewClassModal'
import NewExerciseModal from '../fitnessPlans/NewExerciseModal'

const planCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    flexFlow: 'row wrap'
}

const HealthDateShow = (props) => {

    const { showDate, healthDate, triggerRefresh, user, msgAlert } = props
    const dateFound = Object.keys(healthDate).length > 0
    const isPlannable = dateFound ? healthDate.isPlannable : showDate >= get_formatted_health_date(new Date())
    const isTrackable = dateFound && healthDate.isTrackable

    // Create State
    const [ newHealthDate, setNewHealthDate ] = useState({
        goalStatement: '',
        focusArea: ''
    })
    const [editModalShow, setEditModalShow] = useState(false)
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    const [classModalShow, setClassModalShow] = useState(false)
    const [exerciseModalShow, setExerciseModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const triggerShowRefresh = () => {
        setUpdated(prev => !prev)
        triggerRefresh()
    }
    
    useEffect(() => {
        // console.log('is this even being called????????')
        setNewHealthDate(healthDate)
        // console.log('reset new health date',  newHealthDate)
    }, [updated])

    const onCreateChange = (evt) => {
        evt.persist()
        setNewHealthDate( prevHealthDate => {
            const updatedName = evt.target.name
            let updatedValue = evt.target.value
            // console.log('showDate = ', showDate)
            // console.log('newHealthDate = ',  newHealthDate)
            const updatedHealthDate = { 
                [updatedName] : updatedValue,
                dateString: showDate
            }

            return {
                ...prevHealthDate, ...updatedHealthDate
            }
        })
    }

    const onCreateSubmit = (evt) => {
        evt.preventDefault()
        // console.log('showDate = ', showDate)
        // console.log('new health date: ', newHealthDate)
        createHealthDate(user, newHealthDate)
            .then(() => triggerShowRefresh())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createHealthDateSuccess,
                    variant: 'success'
                })
            })
            .then(() => setNewHealthDate({}))
            .catch(err => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    // Handle Delete
    const clearDayCompletely = () => {
        removeHealthDate(user, healthDate._id)
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deleteHealthDateSuccess,
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

    // Build our Plan Cards
    let fitnessPlanCards
    if (dateFound) {
        if (healthDate.fitnessPlans.length > 0) {
            healthDate.fitnessPlans.sort((a, b) => (
                a.type.localeCompare(b.type)
                || a.name.localeCompare(b.name)
            ))
            fitnessPlanCards = healthDate.fitnessPlans.map(fPlan => (
                <FitnessPlanShow 
                    key={fPlan._id}
                    fitnessPlan={fPlan}
                    healthDate={healthDate}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={triggerRefresh}
                    isPlannable={isPlannable}
                    isTrackable={isTrackable}
                />
            ))
        } else {
            fitnessPlanCards = <p>No plans set up for this date</p>
        }
    }

    return (
        <>
            <Card key={ healthDate ? healthDate._id : 'new_card' }>
                <Card.Title className='card-title bg-opacity-25'>
                    { showDate }
                </Card.Title>
                <Card.Body className='card-body'>
                    {
                        dateFound
                        ?
                        <Card.Text>
                            Goal Statement: { healthDate.goalStatement }
                            <br />
                            Focus Area: { healthDate.focusArea }
                        </Card.Text>
                        :
                        <>
                            {
                                isPlannable
                                ?
                                <>   
                                    <HealthDateForm 
                                        healthDate={healthDate}
                                        handleChange={onCreateChange}
                                        handleSubmit={onCreateSubmit}
                                        handleCancel={triggerShowRefresh}
                                        heading='Start planning...'
                                    />
                                </>
                                :
                                <h3 className='header-center'>No plans found...<br/>and we can't add any since the date is in the past</h3>
                            }
                        </>
                    }

                </Card.Body>
                <Card.Footer>
                    {
                        dateFound && isPlannable
                        ?
                            <div className='card-btn-group'>
                                <FontAwesomeIcon 
                                    icon={faEdit} 
                                    className="text-dark cursor" 
                                    onClick={() => setEditModalShow(true)} 
                                />
                                &nbsp; &nbsp;
                                <FontAwesomeIcon 
                                    icon={faTrash} 
                                    className="text-danger cursor" 
                                    onClick={() => setDeleteModalShow(true)} 
                                />
                            </div>
                        :
                            dateFound && !isPlannable
                            ?
                                <>
                                    <small>No change can be made as this date is in the past</small>
                                </>
                            :
                                <></>
                    }
                </Card.Footer>
            </Card>
            {
                dateFound
                ?
                    <Card key={ Date.now() + Math.random() } className='mt-2'>
                        <Card.Title className='card-title bg-opacity-50'  style={{fontSize: '2vh'}}>Fitness Plans
                        </Card.Title>
                        <Card.Body style={planCardContainerLayout}> 
                            { fitnessPlanCards }
                        </Card.Body>
                        {
                            isPlannable
                            ?
                                <Card.Footer>
                                    <div className='card-btn-group'>
                                        <Button
                                            className="m-2 card-btn"
                                            onClick={() => setClassModalShow(true)}
                                            >
                                            Add Class
                                        </Button>
                                        <Button
                                            className="m-2 card-btn"
                                            onClick={() => setExerciseModalShow(true)}
                                            >
                                            Add Exercise
                                        </Button>
                                    </div>
                                </Card.Footer>
                            :
                                <></>
                        }
                    </Card>
                :
                    <></>
            }
            <EditHealthDateModal 
                user={user}
                show={editModalShow}
                updateHealthDate={updateHealthDate}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                healthDate={healthDate}
                triggerRefresh={triggerShowRefresh}
            />
            <DeleteConfirmationModal 
                showModal={deleteModalShow}
                confirmModal={clearDayCompletely}
                handleClose={() => setDeleteModalShow(false)}
                message={`Are you sure you want to delete goal statement, focus area, and plans for ${ healthDate.dateString }?`}
            />
            <NewClassModal
                healthDate={healthDate}
                show={classModalShow}
                user={user}
                msgAlert={msgAlert}
                handleClose={() => setClassModalShow(false)}
                triggerRefresh={triggerShowRefresh}
            />
            <NewExerciseModal
                healthDate={healthDate}
                show={exerciseModalShow}
                user={user}
                msgAlert={msgAlert}
                handleClose={() => setExerciseModalShow(false)}
                triggerRefresh={triggerShowRefresh}
            />
        </>
    )
}

export default HealthDateShow