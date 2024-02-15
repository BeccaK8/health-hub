import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import { removeFitnessPlan } from '../../api/fitnessPlan'
import messages from '../shared/AutoDismissAlert/messages'
import DeleteConfirmationModal from '../shared/DeleteConfirmationModal'
import EditClassModal from './EditClassModal'
import EditExerciseModal from './EditExerciseModal'

const setBgCondition = (planType) => {
    if (planType === 'ClassPlan') {
        return ({backgroundColor: '#cbc6dd'})
    } else if (planType === 'ExercisePlan') {
        return ({backgroundColor: '#f0f1ba'})
    } else { 
        return ({})
    }
}

const FitnessPlanShow = (props) => {

    const { user, healthDate, fitnessPlan, msgAlert, triggerRefresh, isPlannable } = props

    const [editClassModalShow, setEditClassModalShow] = useState(false)
    const [editExerciseModalShow, setEditExerciseModalShow] = useState(false)
    const [deleteModalShow, setDeleteModalShow] = useState(false)

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
                <Card.Header style={setBgCondition(fitnessPlan.type)}>{fitnessPlan.name}</Card.Header>
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
                                isPlannable
                                ?
                                    <div className='card-btn-group'>
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