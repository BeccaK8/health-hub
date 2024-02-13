import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'

import HealthDateNavButton from './HealthDateNavButton'

const HealthDateNavigation = (props) => {

    const { handleClick, changeDate, triggerRefresh, msgAlert, user, showDate } = props

    // const [ showDate, setShowDate ] = useState(props.showDate)
    // const [ dateDivs, setDateDivs ] = useState([])
    // const [ updated, setUpdated ] = useState(false)

    const showDateObj = new Date(showDate)
    // console.log('showDateObj = ', showDateObj)

    const onClick = () => {

        console.log('made it to this onclick in HealthDateNavigation')
        // setUpdated(prev => !prev)
        triggerRefresh()
        // setShowDate(props.showDate)
        // handleClick()
    }
    
    const diff = showDateObj.getDate() - showDateObj.getDay() + (showDateObj.getDay() === 0 ? 6 : 1)
    const startOfWeek = new Date(showDateObj.setDate(diff))

    //useEffect(() => {
        const dateDivs = []
        // console.log('in healthdatenav useeffect')
        // console.log('old date divs = ', dateDivs)

        /* handle prev week button */
        const prevWeekDate = new Date(startOfWeek)
        prevWeekDate.setDate(startOfWeek.getDate() - 7)
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
        // newDateDivs.push(<div key='left' className='date-nav-div'><FontAwesomeIcon icon={ faChevronLeft }/></div>)
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

        // newDateDivs.push(<div key='right' className='date-nav-div'><FontAwesomeIcon icon={ faChevronRight }/></div>)
      //  setDateDivs(newDateDivs)
        // console.log('new date divs = ', dateDivs)
    //}, [])


    return (
        <>
            <Container key='date-nav-section' className='date-nav-section'>
                <div key='month-nav' className='month-nav'>
                    { showDateObj.toLocaleString('default', { month: 'long'}) }
                </div>
                <div key='date-nav' className='date-nav'>
                    { dateDivs }
                </div>
            </Container>
        </>
    )
}

export default HealthDateNavigation