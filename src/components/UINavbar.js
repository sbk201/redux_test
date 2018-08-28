import React from "react";
import brand from '../img/brand.png';
import { Nav,NavItem,NavDropdown,MenuItem,Navbar,FormControl,FormGroup,Button } from "react-bootstrap";

const UINavbar=props=>{

	return (
		<Navbar inverse collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand>
					<a href="#brand"><img src={brand} style={{width:"4em"}}/></a>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<NavItem eventKey={1} href="#">
            Link
					</NavItem>
					<NavItem eventKey={2} href="#">
            Link
					</NavItem>
				</Nav>
				<Nav pullRight>
					<NavItem eventKey={1} href="#">
            Link Right
					</NavItem>
					<NavItem eventKey={2} href="#">
            Link Right
					</NavItem>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
export default UINavbar;