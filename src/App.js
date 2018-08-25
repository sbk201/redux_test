import { connect } from "react-redux";
import { smart } from "./Actions.js";
import React, { Component } from "react";
import "react-dom";
import { Col,Row,Grid } from "react-bootstrap";

const mapStateToProps = (state) => {
	return { };
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetch:()=>dispatch(smart.getIdeas()),
	};
};
class App extends Component {
	componentDidMount() {
		this.props.fetch();
	}
	// <div className="row">
	// <div className="col-xs-6" style={{backgroundColor:"lightblue"}}>Part A</div>					
	// <div className="col-xs-6" style={{backgroundColor:"green"}}>Part B</div>		
	// </div>
	render(){
		return (
			<div className="container-fluid">
				<h1>Main App</h1>
				<Grid>
					<Row className="show-grid">
						<Col xs={12} md={8}>
							<code>{"<Col xs={12} md={8} />"};</code>
						</Col>
						<Col xs={6} md={4}>
							<code>{"<Col xs={6} md={4} />"}</code>
						</Col>
					</Row>

					<Row className="show-grid">
						<Col xs={6} md={4}>
							<code>{"<Col xs={6} md={4} />"}</code>
						</Col>
						<Col xs={6} md={4}>
							<code>{"<Col xs={6} md={4} />"}</code>
						</Col>
						<Col xsHidden md={4}>
							<code>{"<Col xsHidden md={4} />"}</code>
						</Col>
					</Row>

					<Row className="show-grid">
						<Col xs={6} xsOffset={6}>
							<code>{"<Col xs={6} xsOffset={6} />"}</code>
						</Col>
					</Row>

					<Row className="show-grid">
						<Col md={6} mdPush={6}>
							<code>{"<Col md={6} mdPush={6} />"}</code>
						</Col>
						<Col md={6} mdPull={6}>
							<code>{"<Col md={6} mdPull={6} />"}</code>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);