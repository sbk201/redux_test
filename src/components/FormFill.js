import React from "react";
import { Button,FormGroup,ControlLabel,FormControl,HelpBlock,ToggleButton,ToggleButtonGroup  } from "react-bootstrap";
import {defaults,pick} from "lodash";
import {switchFP} from "../init/global";
// import PropTypes from "prop-types";
const upperCase=string=>string.charAt(0).toUpperCase() + string.substr(1);

// const Radios=theProps=>
const InputField=params =>{
	window.switchFP=switchFP;
	const { id, label, hide, help, validationState=null,...props }=params;
	const f=()=>{};
	if(hide) return <div></div>;
	const onChangeValue=e=>props.onChange(e.target.value);
	const getOptions=onChange=>props.options.map(([name,value])=> 
			<ToggleButton key={name} value={value} onChange={onChangeValue}>{name}</ToggleButton>)
	if(props.type==="radio"){
		const pValue=switchFP(props.value,x=>[[!x,null],[x!=="true",false],[true,true]])
		return (
			<ToggleButtonGroup type="checkbox" value={pValue} onChange={f}>
				<ControlLabel>{label}</ControlLabel><br/>
				      {getOptions(onChangeValue)}
				{help && <HelpBlock>{help}</HelpBlock>}
			</ToggleButtonGroup>
		);}
	if(props.type==="checkbox"){
		return (
			<ToggleButtonGroup type="checkbox" onChange={props.onChange} style={{display:"block"}}>
				<ControlLabel>{label}</ControlLabel><br/>
				      {getOptions()}
				{help && <HelpBlock>{help}</HelpBlock>}
			</ToggleButtonGroup>
		);}
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
			<InputField {...getConfig("isRich")} />
			<InputField {...getConfig("interest")} />
			<InputField {...getConfig("salary")} />
			<InputField {...getConfig("toy")} />
			<br/><br/>
    		<Button>Submit</Button>
		</form>
	);
};
export default FormFill;
