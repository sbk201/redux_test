import React from "react";
import { Button } from "react-bootstrap";
import InputField from "./InputField";
// import PropTypes from "prop-types";
const upperCase=string=>string.charAt(0).toUpperCase() + string.substr(1);

const getProps=props=>{
	const {allItem}=props;
	const getConfig=id=>{
		const formItem=allItem.find(ele=>ele.id===id);
		const newID="formControl"+upperCase(id);
		return {...formItem,id: newID};
	};
	return {getConfig};
};
const FormFill=props=>{
  	const {getConfig}=getProps(props);
  	
	return (
		<form>
			<InputField {...getConfig("age")} />
			<InputField {...getConfig("salary")} />
			<InputField {...getConfig("interest")} />
			<InputField {...getConfig("isRich")} />
			<InputField {...getConfig("toy")} />
			<InputField {...getConfig("date")} />
			<br/><br/>
    		<Button>Submit</Button>
		</form>
	);
};
export default FormFill;