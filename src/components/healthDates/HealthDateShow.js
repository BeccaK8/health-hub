import { Card, Button } from "react-bootstrap"

const HealthDateShow = (props) => {
    const { showDate, healthDate } = props
    return (
        <Card key={ healthDate ? healthDate._id : 'new_card' }>
            <Card.Title className='card-title bg-opacity-25'>
                { showDate }
            </Card.Title>
            <Card.Body>
                {
                        healthDate
                        ?
                        <Card.Text>
                            Goal Statement: { healthDate.goalStatement }
                            <br />
                            Focus Area: { healthDate.focusArea }
                        </Card.Text>
                        :
                        <Button>Let's Make Plans for { showDate }</Button> 
                }

            </Card.Body>
            <Card.Footer>
                buttons go here
            </Card.Footer>
        </Card>
    )
}

export default HealthDateShow