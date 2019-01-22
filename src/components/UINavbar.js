import React from "react";
import { Nav,NavItem,Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const UINavbar=props=>{
	const NavIt=({link,children})=><NavItem eventKey={1} componentClass={Link} href={link} to={link}>{children}</NavItem>
	return (
		<Navbar collapseOnSelect fixedTop>
			<Navbar.Header>
				<Navbar.Brand style={{paddingTop:"0.5rem",paddingBottom:"0.5rem"}}>
					<Link to="/" style={{padding:"0.5rem"}}>
					{/*<img src={brand} style={{width:"2em"}} alt=""/>*/}
					</Link>
					Main App
				</Navbar.Brand>

				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<NavIt link="/gallery"> Gallery </NavIt>
					<NavIt link="/123123"> 404 </NavIt>
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