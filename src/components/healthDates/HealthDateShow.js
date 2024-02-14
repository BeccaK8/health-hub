import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from "react-bootstrap"

import { get_formatted_health_date } from "../../lib/health_date_helper_functions"
import HealthDateForm from "../shared/HealthDateForm"
import { createHealthDate, removeHealthDate } from '../../api/healthDate'
import messages from '../shared/AutoDismissAlert/messages'

const HealthDateShow = (props) => {

    const { showDate, healthDate, triggerRefresh, user, msgAlert } = props
    const navigate = useNavigate()
    const dateFound = Object.keys(healthDate).length > 0
    const isPlannable = dateFound ? healthDate.isPlannable : showDate >= get_formatted_health_date(new Date())

    // Create State
    const [ newHealthDate, setNewHealthDate ] = useState({
        goalStatement: '',
        focusArea: ''
    })

    const onCreateChange = (evt) => {
        evt.persist()
        setNewHealthDate( prevHealthDate => {
            const updatedName = evt.target.name
            let updatedValue = evt.target.value

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
        console.log('new health date: ', newHealthDate)
        createHealthDate(user, newHealthDate)
            .then(() => triggerRefresh())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createHealthDateSuccess,
                    variant: 'success'
                })
            })
            .catch(err => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    // Edit State
    const [editModalShow, setEditModalShow] = useState(false)

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

    return (
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
                            <Button
                                className="m-2"
                                variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Edit
                            </Button>
                            <Button
                                className="m-2"
                                variant="danger"
                                onClick={() => clearDayCompletely(true)}
                            >
                                Delete
                            </Button>
                        </div>
                    : 
                        <>
                            <small>No change can be made as this date is in the past</small>
                        </>
                }
            </Card.Footer>
        </Card>
    )
}

export default HealthDateShow