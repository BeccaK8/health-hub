import { Card, Button } from "react-bootstrap"

import { get_formatted_health_date } from "../../lib/health_date_helper_functions"

const HealthDateShow = (props) => {

    const { showDate, healthDate } = props
    const dateFound = Object.keys(healthDate).length > 0
    const isPlannable = dateFound ? healthDate.isPlannable : showDate >= get_formatted_health_date(new Date())

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
                        <h3 className='header-center'>No plans found...</h3>
                        {
                            isPlannable
                            ?
                            <Button className='card-btn'>Let's Make Plans for { showDate }</Button> 
                            :
                            <h3 className='header-center'>and we can't add any since the date is in the past</h3>
                        }
                    </>
                }

            </Card.Body>
            <Card.Footer>
                {
                    dateFound || isPlannable
                    ?
                        <small>buttons go here</small>
                    : 
                        <></>
                }
            </Card.Footer>
        </Card>
    )
}

export default HealthDateShow