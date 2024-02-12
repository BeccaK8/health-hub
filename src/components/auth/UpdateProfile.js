import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { updateProfile } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import { Form, Button } from 'react-bootstrap'

const UpdateProfile = (props) => {

    const { msgAlert, user } = props

    const [userName, setUserName] = useState(user && user.userName ? user.userName : '')

    const navigate = useNavigate()

	const onSubmit = (event) => {
		event.preventDefault()

        console.log('the user', user)
        user.userName = userName
        
        const profile = { userName }

		updateProfile(profile, user)
			.then(() =>
				msgAlert({
					heading: 'Update Profile Success',
					message: messages.updateProfileSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
				setUserName('')
				msgAlert({
					heading: 'Update Profile Failed with error: ' + error.message,
					message: messages.updateProfileFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5 pb-3 p-5 mb-4 bg-light rounded-3'>
                <h3 className='header'>Update Profile</h3>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId='userName' className='mt-2'>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            name='userName'
                            value={userName}
                            type='text'
                            placeholder='Preferred Name'
                            onChange={e => setUserName(e.target.value)}
                        />
                    </Form.Group>
                    <Button type='submit' className='btn-submit m-2'>
                        Submit
                    </Button>
                    <Button type='submit' variant='secondary' className='m-2'>
                        Cancel
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default UpdateProfile