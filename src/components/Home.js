import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = (props) => {
	const { user } = props
	console.log('props in home', props)

	return (
		<> 
			<Container className="p-3 wrapper">
				<Container className="pb-3 p-5 mb-4 bg-light rounded-3">
					<h1 className="header-center">Welcome To Health Hub</h1>
					<h2 className="subheader">Let us help you manage your fitness health</h2>
					<br />
					{
						user
						?
						<p style={{textAlign: 'center'}}>
							<Link to='today' className='navigation-link'>See what's planned for today!</Link>
						</p>
						:
						<p style={{textAlign: 'center'}}>
							<Link to='sign-up' className='navigation-link'>Sign Up</Link> or <Link to='sign-in' className='navigation-link'>Sign In</Link> to get started!
						</p>
					}
				</Container>
			</Container>
		</>
	)
}

export default Home
