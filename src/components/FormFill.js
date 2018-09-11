import React from "react";
import { FormGroup,ControlLabel,FormControl,HelpBlock,Radio } from "react-bootstrap";
import {defaults,pick} from "lodash";
import {switchFP} from "../init/global";
// import PropTypes from "prop-types";
const upperCase=string=>string.charAt(0).toUpperCase() + string.substr(1);

// const Radios=theProps=>
const InputField=params =>{
	const { id, label, hide, help, validationState=null,...props }=params;
	if(hide) return <div></div>;
	if(props.type==="radio")
		return (
			<FormGroup controlId={"radio123"}>
		      <Radio name="radioGroup" inline>
		        1
		      </Radio>{" "}
		      <Radio name="radioGroup" inline>
		        2
		      </Radio>{" "}
		      <Radio name="radioGroup" inline>
		        3
		      </Radio>
		    </FormGroup>
		);
	return (
		<FormGroup controlId={id} validationState={validationState}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>);
};
const getProps=props=>{
	const {UI,updateUI,getFormItem}=props;
	// const formValues=defaults(UI.formValues);
	const getConfig=id=>{
		const formItem=getFormItem(UI,updateUI).find(ele=>ele.id===id);
		const newID="formControl"+upperCase(formItem.id);
		return {...formItem,id: newID};
	};
	// const getConfig=id=>_getConfig(id,props);
	return {getConfig};
};
const FormFill=props=>{
  	// const {UI,updateUI}=props;
  	const {getConfig}=getProps(props);
  	
	return (
		<form>
			<InputField {...getConfig("age")} />
			<InputField {...getConfig("salary")} />
			<InputField {...getConfig("toy")} />
			<InputField {...getConfig("isRich")} />
		</form>
	);
};
export default FormFill;
