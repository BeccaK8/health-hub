import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import get_formatted_health_date from '../../lib/get_formatted_health_date'

const HealthDateNavButton = (props) => {
    const { thisCardDate, showDate, handleClick, displayValue, changeDate } = props
    const formattedHealthDate = get_formatted_health_date(thisCardDate)
    const showing = (formattedHealthDate === showDate)

    const handleDateClick = (evt) => {
        console.log('event id of clicked div is = ', evt.target.id)
        if (evt.target.id) {
            changeDate(evt.target.id)
            handleClick()
        } else {
            console.log('no div targeted so staying here')
        }
    }

    return (
        <>
            {/* <Link 
                key={`link_${formattedHealthDate}`} 
                to={ `/dates/${formattedHealthDate }`} 
                onClick={handleClick} 
                className={ showing ? 'navigation-selected-date-link' : 'navigation-date-link'}
            > */}
                <div 
                    key={`div_${formattedHealthDate}` } 
                    className={ showing ? 'date-nav-div selected-date' : 'date-nav-div unselected-date'}
                    onClick={handleDateClick}
                    id={ formattedHealthDate }
                >
                    {
                        displayValue
                        ?
                            displayValue === 'left'
                            ?
                            <FontAwesomeIcon icon={ faChevronLeft }/>
                            : 
                            <FontAwesomeIcon icon={ faChevronRight }/>
                        :
                        thisCardDate.toLocaleString('default', { day: 'numeric' })
                    }
                </div>
            {/* </Link> */}
        </>
    )
}

export default HealthDateNavButton