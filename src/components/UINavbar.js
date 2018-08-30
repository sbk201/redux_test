import React from "react";
import brand from '../img/brand.png';
import { Nav,NavItem,NavDropdown,MenuItem,Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const UINavbar=props=>{
	const NavIt=({link,children})=><NavItem eventKey={1} componentClass={Link} href={link} to={link}>{children}</NavItem>
	return (
		<Navbar collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand>
					<Link to="/" style={{padding:"0.5rem"}}><img src={brand} style={{width:"2em"}}/></Link>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<NavIt link="/123123">
            		Test
					</NavIt>
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