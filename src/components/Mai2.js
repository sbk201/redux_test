import React from "react";
// import PropTypes from "prop-types";
import { Message,Button } from 'semantic-ui-react'

const getProps=props=>{
	return {}
}
const Main=props=>{
  	const {data}=props;
  	// const {search ,SbuList,CountryList}=getProps(props);
  	const search=()=>null;
	return (
		<div> <br/>
			<Message>
				<Message.Header>Select SBU</Message.Header>
			 	{/*<SbuList sbus={sbus}/>*/}
				<Button color="blue" onClick={()=>search("unassigned",this)}>Unassigned Customer</Button>
			</Message>
		</div>
	);
}
export default Main