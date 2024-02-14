// This form will be used by both HealthDateCreate and HealthDateUpdate
import { Form, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HealthDateForm = (props) => {

    const { healthDate, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center mt-1">
            <h3 className='header-center'>{ heading }</h3>
            <Form onSubmit={handleSubmit} className='mt-1'>
                <Form.Group className='m-2'>
                    <Form.Label>Daily Goal Mantra:</Form.Label>
                    <Form.Control 
                        placeholder="What's your mantra or theme for this date?"
                        id="goalStatement"
                        name="goalStatement"
                        value={ healthDate.goalStatement }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Select 
                        aria-label="focus area"
                        name="focusArea"
                        defaultValue={ healthDate.focusArea }
                        onChange={handleChange}
                    >
                        <option value="">Select a primary focus area for the day...</option>
                        <option value="Strength">Strength</option>
                        <option value="Endurance">Endurance</option>
                        <option value="Recovery">Recovery</option>
                    </Form.Select>
                </Form.Group>
                <div className='card-btn-group'>
                    <Button className="card-btn m-2" type="submit">Save</Button>
                    <Link to="/" className="btn btn-secondary">
                        Cancel
                    </Link>
                </div>
            </Form>
        </Container>
    )
}

export default HealthDateForm