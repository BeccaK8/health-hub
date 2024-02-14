import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import get_formatted_health_date from '../../lib/get_formatted_health_date'

const HealthDateNavButton = (props) => {
    const { thisCardDate, showDate, handleClick, displayValue, changeDate } = props
    const formattedHealthDate = get_formatted_health_date(thisCardDate)
    const showing = (formattedHealthDate === showDate)

    const handleDateClick = (evt) => {
        const theDiv = (evt.target.nodeName === 'DIV') ? evt.target : evt.target.closest("DIV")
        const newDate = theDiv.id;
        if (newDate) {
            changeDate(newDate)
            handleClick()
        } else {
            console.log('no div targeted so staying here', evt.target)
        }
    }

    return (
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
                    <FontAwesomeIcon icon={ faChevronLeft } data-id={ formattedHealthDate } />
                    : 
                    <FontAwesomeIcon icon={ faChevronRight } data-id={ formattedHealthDate } />
                :
                thisCardDate.toLocaleString('default', { day: '2-digit' })
            }
        </div>
    )
}

export default HealthDateNavButton