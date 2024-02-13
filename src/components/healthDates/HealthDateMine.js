import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { getOneHealthDateByDate } from '../../api/healthDate'

import HealthDateNavigation from "./HealthDateNavigation"
import HealthDateShow from './HealthDateShow'
import LoadingScreen from '../shared/LoadingScreen'

import get_formatted_health_date from '../../lib/get_formatted_health_date'
import messages from '../shared/AutoDismissAlert/messages'

const HealthDateMine = (props) => {
    console.log('are we here??????')

    const { msgAlert, user } = props

    let { showDate } = useParams()
    console.log('showDate = ', showDate)

    if (!showDate) {
        showDate = get_formatted_health_date(new Date())
    }
    console.log('showDate = ', showDate)

    const [healthDate, setHealthDate] = useState(null)
    const [updated, setUpdated] = useState(false)

    //const navigate = useNavigate()

    useEffect(() => {
        getOneHealthDateByDate(showDate, user)
            .then(res => {
                console.log('in useEffect: res.data = ', res.data.healthDate)
                setHealthDate(res.data.healthDate)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError + err,
                    variant: 'danger'
                })
            })
    }, [updated])

    if (!healthDate) {
        return <LoadingScreen />
    }
    return (
        <>
            <Container className='m-4'>
                <HealthDateNavigation 
                    showDate={showDate}
                    msgAlert={msgAlert}
                    user={user}
                />
                <Container className='show-pane m-4'>
                    <HealthDateShow 
                        healthDate={healthDate}
                        showDate={showDate}
                    />    
                </Container>
            </Container>
        </>
    )
}

export default HealthDateMine