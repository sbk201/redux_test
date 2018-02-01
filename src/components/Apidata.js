import React from "react";
import PropTypes from "prop-types";
// import styled from "styled-components";
import { Component } from 'react';
class Apidata extends Component {
	componentDidMount() {
		this.props.post();
  }
  render(){
  	const {data}=this.props;
	return (
		<div style={{textAlign:"center"}}>
			<h1>Apidata</h1>
			<div>id {data.id}</div>
			<div>name {data.name}</div>
			<div>image {data.image}</div>
			<div>modified {data.modified}</div>
		</div>
	);
  	
  }
}
// Apidata.propTypes = {
	// text: PropTypes.string,
	// done: PropTypes.bool,
	// createdAt: PropTypes.string
// };
export default Apidata;