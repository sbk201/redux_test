import React, { Component, Fragment as Frag} from "react";
import { connect } from "react-redux";
import { Nav,NavItem,Navbar } from "react-bootstrap";
import {updateUI} from '../Actions.js'
import { Link } from "react-router-dom";
import "react-dom";
const contName="UINavbar";

const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
	return { UI};
};
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
	return {
    	updateUI:cmd=>dispatchUI({...cmd,contName}),
	};
};
class UINavbar extends Component {
	render(){
		const expanded= this.props.UI.expanded;
		const clickExpanded= ()=> this.props.updateUI({expanded:!expanded});
		const NavIt=({link,children})=><NavItem eventKey={1} componentClass={Link} href={link} to={link}>{children}</NavItem>
		return (
		<Navbar fixedTop onToggle={clickExpanded} expanded={expanded}>
			<Navbar.Header>
				<Navbar.Brand style={{paddingTop:"0.5rem",paddingBottom:"0.5rem"}}>
					<Link to="/" style={{padding:"0.5rem"}}>
					{/*<img src={brand} style={{width:"2em"}} alt=""/>*/}
					</Link>
					Main App
				</Navbar.Brand>

				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse onClick={clickExpanded}>
				<Nav>
					<NavIt link="/simple"> Simple </NavIt>
					<NavIt link="/advance"> Advance </NavIt>
					<NavIt link="/jobs"> Jobs </NavIt>
					<NavIt link="/123123"> 404 </NavIt>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UINavbar);