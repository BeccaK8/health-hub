// This form will be used by both HealthDateCreate and HealthDateUpdate
import { Form, Button, Container } from 'react-bootstrap'

const HealthDateForm = (props) => {

    const { healthDate, handleChange, handleSubmit, handleCancel, heading } = props

    return (
        <Container className="justify-content-center mt-1">
            {
                heading
                ?
                    <h3 className='header-center pb-1'>{ heading }</h3>
                :
                    <></>
            }
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
                    <Form.Label>Primary Focus Area:</Form.Label>
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
                <div className='card-btn-group-end'>
                    <Button variant="default" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="success" type="submit">
                        Save
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default HealthDateForm