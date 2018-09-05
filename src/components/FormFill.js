import React from "react";
import { FormGroup,ControlLabel,FormControl,HelpBlock } from "react-bootstrap";
import {defaults} from "lodash";
// import PropTypes from "prop-types";

const _getConfig=(id,{UI,updateUI})=>[{
	id:"someText",
	validationState:"success",
	label:"some text",
	value:UI.value1||"" ,
	onChange:e=>updateUI({value1:e.target.value})
}]
.find(ele=>ele.id===id);
const InputField=params =>{
	const { id, label, help, validationState="",...props }=params;
	return (
		<FormGroup controlId={id} validationState={validationState}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>)
};
const getProps=props=>{
	const {UI}=props;
	const formValues=defaults(UI.formValues);
	const getConfig=id=>_getConfig(id,props);
	return {formValues,getConfig};
};
const upperCase=string=>string.charAt(0).toUpperCase() + string.substr(1);
const FormFill=props=>{
  	const {UI,updateUI}=props;
  	const {getConfig}=getProps(props);
  	console.log(UI);
  	
	return (
		<form>
			<InputField {...getConfig("someText")} />
		</form>
	);
};
export default FormFill;

{/*			<InputField
				_id="someText"
				label="Name"
				placeholder="Enter text"
				{...formValues}
			/>*/}


			{/*<FormGroup
	          controlId="formBasicText"
	        >
	          <ControlLabel>Working example with validation</ControlLabel>
	          <FormControl
	            type="text"
	            value={UI.text2||""}
	            placeholder="Enter text"
	            onChange={e=>updateUI({text2:e.target.value})}
	          />
	          <FormControl.Feedback />
	          <HelpBlock>Validation is based on string length.</HelpBlock>
	        </FormGroup>*/}