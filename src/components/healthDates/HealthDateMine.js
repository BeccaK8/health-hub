import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { getOneHealthDateByDate } from '../../api/healthDate'

import HealthDateNavigation from "./HealthDateNavigation"
import HealthDateShow from './HealthDateShow'
import LoadingScreen from '../shared/LoadingScreen'

import get_formatted_health_date from '../../lib/get_formatted_health_date'
import messages from '../shared/AutoDismissAlert/messages'

const HealthDateMine = (props) => {

    const { msgAlert, user } = props

    const [showDate, setShowDate] = useState(get_formatted_health_date(new Date()))
    const [healthDate, setHealthDate] = useState(null)
    const [updated, setUpdated] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getOneHealthDateByDate(showDate, user)
            .then(res => {
                // console.log('in useEffect: res.data = ', res.data.healthDate)
                setHealthDate(res.data.healthDate)
            })
            .then(() => navigate(`/dates/${showDate}`))
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
            <div className='row'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5 pb-3 p-5 mb-4 bg-light rounded-3'>
                    <HealthDateNavigation 
                        showDate={showDate}
                        msgAlert={msgAlert}
                        user={user}
                        changeDate={setShowDate}
                        triggerRefresh={() => setUpdated(prev => prev = !prev)}
                    />
                    <Container className='show-pane mt-3 mb-3'>
                        <HealthDateShow 
                            healthDate={healthDate}
                            showDate={showDate}
                        />    
                    </Container>
                </div>
            </div>
        </>
    )
}

export default HealthDateMine