import { Container } from 'react-bootstrap'

import HealthDateNavButton from './HealthDateNavButton'
import { get_health_date_object } from '../../lib/health_date_helper_functions'

const HealthDateNavigation = (props) => {

    const { changeDate, triggerRefresh, showDate } = props

    // console.log('showDate = ', showDate)
    const showDateObj = get_health_date_object(showDate)
    const month = showDateObj.toLocaleString('default', { month: 'long'})
    // console.log('showDateObj = ', showDateObj)
    // console.log('showDateObj month = ', month)

    const onClick = () => {
        triggerRefresh()
    }

    const diff = showDateObj.getDate() - showDateObj.getDay() + (showDateObj.getDay() === 0 ? -6 : 1)
    const startOfWeek = new Date(showDateObj.setDate(diff))
    // console.log('startOfWeek = ', startOfWeek)

    const dateDivs = []

    /* handle prev week button */
    const prevWeekDate = new Date(startOfWeek)
    prevWeekDate.setDate(startOfWeek.getDate() - 1)
    dateDivs.push(
        <HealthDateNavButton
            thisCardDate={prevWeekDate}
            showDate={showDate}
            displayValue='left'
            handleClick={onClick}
            changeDate={changeDate}
        />
    )

    /* show daily buttons for this week */
    for (let i = 0; i < 7; i++) {
        const thisCardDate = new Date(startOfWeek)
        thisCardDate.setDate(startOfWeek.getDate() + i)
        dateDivs.push(
            <HealthDateNavButton 
                thisCardDate={thisCardDate} 
                showDate={showDate} 
                handleClick={onClick}
                changeDate={changeDate}
            />
        )
    }

    /* handle next week button */
    const nextWeekDate = new Date(startOfWeek)
    nextWeekDate.setDate(startOfWeek.getDate() + 7)
    dateDivs.push(
        <HealthDateNavButton
            thisCardDate={nextWeekDate}
            showDate={showDate}
            displayValue='right'
            handleClick={onClick}
            changeDate={changeDate}
        />
    )

    return (
        <Container key={ Date.now() + Math.random() } className='date-nav-section'>
            <h1 className='month-nav' key={ Date.now() + Math.random() }>
                { month }
            </h1>
            <div key={ Date.now() + Math.random() } className='date-nav'>
                { dateDivs }
            </div>
        </Container>
    )
}

export default HealthDateNavigation