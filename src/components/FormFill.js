import React from "react";
import { FormGroup,ControlLabel,FormControl,HelpBlock } from "react-bootstrap";
import {defaults} from "lodash";
// import PropTypes from "prop-types";

const formConfig=({UI,updateUI})=>[{
	id:"someText",
	validationState:"success",
	value:UI.value1||"" ,
	onChange:e=>updateUI({value1:e.target.value})
}];
const InputField_=props=>({ _id, label, help, hide,...miniProps_ }) =>{
	if(hide) return <div></div>;
	const id="fromControl"+upperCase(_id);
	const miniProps=defaults(miniProps_,{type:"text"});
	const getConfig=id=>formConfig(props).find(ele=>ele.id===id);
	// const validationState='success'
	// const value="test value";
	// const onChange=e=>console.log(e.target.value);
	// return {validationState,value,onChange}
	
	const {validationState,value,onChange}=getConfig(_id);
	return (
		<FormGroup controlId={id} {...{validationState}}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...{...miniProps,value,onChange}} />
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>
	);
};
const getProps=props=>{
	const {UI}=props;
	const formValues=defaults(UI.formValues,{value:"empty value"});
	const InputField=InputField_(props);
	return {formValues,InputField};
};
const upperCase=string=>string.charAt(0).toUpperCase() + string.substr(1);
const FormFill=props=>{
  	const {UI,updateUI}=props;
  	const {formValues,InputField}=getProps(props);
  	console.log(UI);

	return (
		<form>
			<InputField
				_id="someText"
				label="Name"
				placeholder="Enter text"
				{...formValues}
			/>
		</form>
	);
};
export default FormFill;