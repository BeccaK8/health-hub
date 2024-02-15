import { Form, Button, Container } from 'react-bootstrap'

const ExerciseForm = (props) => {

    const { fitnessPlan, handleChange, handleSubmit, handleCancel } = props

    return (
        <Container className="justify-content-center">
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Focus Area:</Form.Label>
                    <Form.Select 
                        aria-label="Fitness Focus Area"
                        name="fitnessFocusArea"
                        defaultValue={ fitnessPlan.fitnessFocusArea }
                        required
                        aria-required
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
                    <Form.Label>Exercise Name:</Form.Label>
                    <Form.Control 
                        placeholder="What exercise are you going to do?"
                        id="name"
                        name="name"
                        value={ fitnessPlan.name }
                        required
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Reps:</Form.Label>
                    <Form.Control 
                        placeholder="How many reps in each set?"
                        type="number"
                        id="reps"
                        name="reps"
                        value={ fitnessPlan.reps }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Sets:</Form.Label>
                    <Form.Control 
                        placeholder="How many sets are you thinking?"
                        type="number"
                        id="sets"
                        name="sets"
                        value={ fitnessPlan.sets }
                        onChange={handleChange}
                    />
                </Form.Group>

                <div className='card-btn-group'>
                    <Button className="card-btn m-2" type="submit">Save</Button>
                    <Button className="btn-secondary m-2" onClick={handleCancel}>Cancel</Button>
                </div>
            </Form>
        </Container>
    )
}

export default ExerciseForm