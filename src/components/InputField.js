import React from "react";
import { FormGroup,ControlLabel,FormControl,HelpBlock,ToggleButton,ToggleButtonGroup  } from "react-bootstrap";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {switchFP} from "../init/global";

const InputField=params =>{
	const { id, label, hide, help, validationState=null,...props }=params;
	if(hide) return <div></div>;
	const onChangeValue=e=> props.onChange(e.target.value);
	const onChangeNumber=e=>{
		const value=e.target.value;
		const isNumber=(~~value).toString()===value;
		return isNumber ? props.onChange(~~value) : props.onChange(value);
	}
	const f=()=>{};
	const getOptions=onChange=>props.options.map(([name,value])=> 
			<ToggleButton key={name} value={value} onChange={onChangeValue}>{name}</ToggleButton>)
	if(props.type==="radio"){
		const pValue=switchFP(props.value,x=>[[!x,null],[x!=="true",false],[true,true]])
		return (
			<FormGroup controlId={id}>
				<ToggleButtonGroup type="checkbox" value={pValue} onChange={f}>
					<ControlLabel>{label}</ControlLabel><br/>
					      {getOptions(onChangeValue)}
					{help && <HelpBlock>{help}</HelpBlock>}
				</ToggleButtonGroup>
				<br/>
			</FormGroup>
		);
	}
	if(props.type==="checkbox"){
		return (
			<FormGroup controlId={id}>
				<ToggleButtonGroup type="checkbox" onChange={props.onChange} style={{display:"block"}}>
					<ControlLabel>{label}</ControlLabel><br/>
					      {getOptions()}
					{help && <HelpBlock>{help}</HelpBlock>}
				</ToggleButtonGroup>
				<br/>
				<br/>
			</FormGroup>
		);
	}
	const onDayChange=(selectedDay, modifiers, dayPickerInput) =>{
		const value = dayPickerInput.getInput().value;
		props.onChange(value);
	}
	if(props.type==="date"){
		return (
		<FormGroup controlId={id} validationState={validationState}>
			<ControlLabel>{label}</ControlLabel>
			<DayPickerInput 
				value={props.value}
				onDayChange={onDayChange}
				dayPickerProps={{
				selectedDays: props.value,
				disabledDays: {daysOfWeek: [0, 6], },
			}}/>
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>);
	}

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
			<FormControl {...{props,onChange: onChangeValue}} />
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>);
};
export default InputField;