import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'

import messages from '../shared/AutoDismissAlert/messages'

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

    const { user, healthDate, fitnessPlan, msgAlert, triggerRefresh } = props
    console.log('fitnessPlan = ', fitnessPlan)

    return (
        <>
            {
                fitnessPlan.type === 'ClassPlan'
                ?
                    <Card className='m-2' key={ fitnessPlan._id }>
                        <Card.Header style={setBgCondition(fitnessPlan.type)}>{fitnessPlan.name}</Card.Header>
                        <Card.Body>
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
                        </Card.Body>
                        <Card.Footer>
                        </Card.Footer>
                    </Card>
                :
                    <Card className='m-2'>
                        <Card.Header style={setBgCondition(fitnessPlan.type)}>{ fitnessPlan.name }</Card.Header>
                        <Card.Body>
                            <small>Reps: { fitnessPlan.reps }</small>
                            <small>Sets: { fitnessPlan.sets }</small>
                        </Card.Body>
                        <Card.Footer>
                        </Card.Footer>
                    </Card>
            }
        </>
    )
}

export default FitnessPlanShow