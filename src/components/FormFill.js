import React from "react";
import { Button,FormGroup,ControlLabel,FormControl,HelpBlock,ToggleButton,ToggleButtonGroup  } from "react-bootstrap";
import {defaults,pick} from "lodash";
import {switchFP,objLoop2,rename} from "../init/global";
// import PropTypes from "prop-types";
const upperCase=string=>string.charAt(0).toUpperCase() + string.substr(1);

// const Radios=theProps=>
const InputField=params =>{
	window.switchFP=switchFP;
	const { id, label, hide, help, validationState=null,...props }=params;
	const onChangeValue=e=>props.onChange(e.target.value);
	const onChangeNumber=e=>{
		const value=e.target.value;
		const isNumber=(~~value).toString()===value;
		return isNumber ? props.onChange(~~value) : props.onChange(value);
	}
	const f=()=>{};
	if(hide) return <div></div>;
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
			<ToggleButtonGroup type="checkbox" onChange={onChangeValue} style={{display:"block"}}>
				<ControlLabel>{label}</ControlLabel><br/>
				      {getOptions()}
				{help && <HelpBlock>{help}</HelpBlock>}
			</ToggleButtonGroup>
		);}
	if(props.type==="number"){
		return (
		<FormGroup controlId={id} validationState={validationState}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...{props,onChange:onChangeNumber,type:"text"}} />
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>);
	}

	return (
		<FormGroup controlId={id} validationState={validationState}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>);
};
const getProps=props=>{
	const {UI,updateUI,allItem}=props;
	const getConfig=id=>{
		const formItem=allItem.find(ele=>ele.id===id);
		const newID="formControl"+upperCase(id);
		return {...formItem,id: newID};
	};
	return {getConfig};
};
const FormFill=props=>{
  	// const {UI,updateUI}=props;
  	const {getConfig}=getProps(props);
  	
	return (
		<form>
			<InputField {...getConfig("age")} />
			<InputField {...getConfig("age2")} />
			<br/><br/>
    		<Button>Submit</Button>
		</form>
	);
};
export default FormFill;

			// <InputField {...getConfig("age")} />
			// <InputField {...getConfig("isRich")} />
			// <InputField {...getConfig("interest")} />
			// <InputField {...getConfig("salary")} />
			// <InputField {...getConfig("toy")} />