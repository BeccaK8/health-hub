import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import get_formatted_health_date from '../../lib/get_formatted_health_date'

const HealthDateNavigation = (props) => {

    const { msgAlert, user } = props

    const [ showDate, setShowDate ] = useState(props.showDate)
    const showDateObj = new Date(showDate)
    console.log('showDateObj = ', showDateObj)
    
    const diff = showDateObj.getDate() - showDateObj.getDay() + (showDateObj.getDay() === 0 ? 6 : 1)
    const startOfWeek = new Date(showDateObj.setDate(diff))

    let dateDivs = []
    dateDivs.push(<div><FontAwesomeIcon icon={ faChevronLeft }/></div>)
    for (let i = 0; i < 7; i++) {
        const thisCardDate = new Date(startOfWeek)
        thisCardDate.setDate(startOfWeek.getDate() + i)
        const formattedHealthDate = get_formatted_health_date(thisCardDate)
        const showing = (formattedHealthDate === showDate)
        // console.log(`showing = ${showing}, formattedHealthDate = ${formattedHealthDate}, showDate=${showDate}`)
        dateDivs.push(
            <div key={ formattedHealthDate } className={ showing ? 'selected-date' : 'unselected-date'}>{ thisCardDate.toLocaleString('default', { day: 'numeric' }) }</div>
        )
    }
    dateDivs.push(<div><FontAwesomeIcon icon={ faChevronRight }/></div>)

    return (
        <>
            <Container className='date-nav-section'>
                <div className='month-nav'>
                    { showDateObj.toLocaleString('default', { month: 'long'}) }
                </div>
                <div className='date-nav'>
                    { dateDivs }
                </div>
            </Container>
        </>
    )
}

export default HealthDateNavigation