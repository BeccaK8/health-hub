import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faGear } from '@fortawesome/free-solid-svg-icons'

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const ddLinkStyle = {
    color: 'black',
    textDecoration: 'none'
}

const authenticatedOptions = (
	<>
		<NavDropdown 
			title={
				<span className='header-navigation-link'>&nbsp;&nbsp;Settings</span>
			} 
			id='nav-dropdown'
		>
			<NavDropdown.Item eventKey='chg-pass' className='header-navigation-dropdown-link'>
				<Link to='change-password' style={ddLinkStyle}>Change Password</Link>
			</NavDropdown.Item>
			<NavDropdown.Item eventKey='profile' className='header-navigation-dropdown-link'>
				Update Profile
			</NavDropdown.Item>
		</NavDropdown>
		<Nav.Item className='m-2'>
			<Link to='sign-out' style={linkStyle}>Sign Out</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className='m-2'>
			<Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className='m-2'>
			<Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar className='navigation' variant='dark' expand='md'>
		<Navbar.Brand className='m-2'>
            <Link to='/' style={linkStyle}>
                Health Hub
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ms-auto'>
				{user && (
					<span className='accent-text mt-2 mr-5'>Welcome, { user.userName ? user.userName : user.email}&nbsp;&nbsp;&nbsp;</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
