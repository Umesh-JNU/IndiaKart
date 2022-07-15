import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../../../images/logo.jpg'
import { CgProfile, CgHeart, CgShoppingCart } from 'react-icons/cg'
import Search from './Search';

function Header () {
	return (
		<Navbar bg="light" expand="lg" fixed="top">
			<Container fluid>
				<Navbar.Brand href="/">
					<img
						src={logo}
						height="30"
						className="d-inline-block align-top"
						alt="React Bootstrap logo"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Nav.Link href="/products">Products</Nav.Link>
						<NavDropdown title="Category" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Search />
					<Nav>
						<Nav.Link href="#deets"><CgProfile size={25} /></Nav.Link>
						<Nav.Link href="#deets"><CgHeart size={25} /></Nav.Link>
						<Nav.Link href="#deets"><CgShoppingCart size={25} /></Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;