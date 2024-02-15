import { Form, Button, Container } from 'react-bootstrap'

const ClassForm = (props) => {

    const { fitnessPlan, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            {/* <h3>{ heading }</h3> */}
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Focus Area:</Form.Label>
                    <Form.Select 
                        aria-label="Fitness Focus Area"
                        name="fitnessFocusArea"
                        defaultValue={ fitnessPlan.fitnessFocusArea }
                        onChange={handleChange}
                    >
                        <option value="">Select the focus area for this class...</option>
                        <option value="Strength">Strength</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Core">Core</option>
                        <option value="Recovery">Recovery</option>
                        <option value="Combination">Combination</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Sub Focus Area:</Form.Label>
                    <Form.Control 
                        placeholder="Lower body, upper body, etc."
                        id="fitnessSubFocusArea"
                        name="fitnessSubFocusArea"
                        value={ fitnessPlan.fitnessSubFocusArea }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Class Name:</Form.Label>
                    <Form.Control 
                        placeholder="What class are you attending?"
                        id="name"
                        name="name"
                        value={ fitnessPlan.name }
                        required
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Host:</Form.Label>
                    <Form.Control 
                        placeholder="Who is hosting the class?"
                        id="host"
                        name="host"
                        value={ fitnessPlan.host }
                        required
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Location:</Form.Label>
                    <Form.Control 
                        placeholder="Where is the class at?"
                        id="location"
                        name="location"
                        value={ fitnessPlan.location }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Time:</Form.Label>
                    <Form.Control 
                        placeholder="What time is the class?"
                        id="time"
                        name="time"
                        value={ fitnessPlan.time }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Check 
                        label="Is this class virtual?"
                        name="isVirtual"
                        defaultChecked={ fitnessPlan.isVirtual }
                        onChange={handleChange}
                    />
                </Form.Group>
                <div className='card-btn-group'>
                    <Button className="card-btn m-2" type="submit">Save</Button>
                    {/* <Button className="btn-secondary m-2" onClick={handleCancel}>Cancel</Button> */}
                </div>
            </Form>
        </Container>
    )
}

export default ClassForm