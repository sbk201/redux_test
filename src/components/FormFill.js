import React from "react";
import { FormGroup,ControlLabel,FormControl,HelpBlock,Radio } from "react-bootstrap";
import {defaults} from "lodash";
import {switchFP} from "../init/global";
// import PropTypes from "prop-types";
const upperCase=string=>string.charAt(0).toUpperCase() + string.substr(1);

const formSetting=(UI,id)=>[{
	id:"age",
	label:"Age",
	validationState:switchFP(UI[id],x=>[[!x,null], [!Number.isInteger(x),"error"], [x<12,"error"], [true,"success"]]),
	help: switchFP(UI[id],x=>[ [!x,null], [!Number.isInteger(x),"Must be a Number"], [x<12,"must older than 12"], [true,null] ]),
}].find(ele=>ele.id===id)

const _getConfig=(id,{UI,updateUI,checkIt})=>{
	id==="age" && console.log(UI);
	const {validationState=null,help=null,onChange}=UI[id] || {};
	const formIte2=[{
		id:"age",
		label:"Age",
		onChange:e=>checkIt(e.target.value)
	}].map(ele=>({
		...ele,validationState,help
	})).find(ele=>ele.id===id);
	const formItem=[{
		id:"age",
		label:"Age",
		validationState:switchFP(UI.age,x=>[[!x,null], [!Number.isInteger(x),"error"], [x<12,"error"], [true,"success"]]),
		help: switchFP(UI.age,x=>[ [!x,null], [!Number.isInteger(x),"Must be a Number??"], [x<12,"must older than 12"], [true,null] ]),
		onChange:e=>updateUI({age:~~e.target.value})
	}
		/*{
		id:"age",
		label:"Age",
		validationState:UI.age.valid,
		help: UI.age.help,
		onChange:e=>updateUI({age:e.target.value})
	}*/
		,{
			id:"salary",
			label:"Salary",
			hide: !UI.age || UI.age<18,
			value:UI.salary||"" ,
			validationState:switchFP(UI.salary,x=>[[!x,null], [!Number.isInteger(x),"error"], [true,"success"]]),
			help: switchFP(UI.salary,x=>[ [!Number.isInteger(x),"must be a number"], [true,null] ]),
			onChange:e=>updateUI({salary:e.target.value})
		},{
			id:"isRich",
			label:"Are you Rich?",
			hide: !UI.salary || UI.salary<10000,
			value:UI.isRich||"" ,
			type:"radio",
			// validationState:switchFP(UI.isRich,x=>[[!x,null], [,"error"], [true,"success"]]),
			// help: switchFP(UI.isRich,x=>[ [!Number.isInteger(x),"must be a number"], [true,null] ]),
			onChange:e=>updateUI({isRich:e.target.value})
		},{
			id:"toy",
			label:"Toy",
			hide: !UI.age || UI.age<12 || UI.age>=18,
			value:UI.toy||"" ,
			validationState:switchFP(UI.toy,x=>[[!x,null], [x.length<4,"error"], [true,"success"]]),
			help: switchFP(UI.toy,x=>[ [x.length<4,"must write at least 5 letters"], [true,null] ]),
			onChange:e=>updateUI({toy:e.target.value})
		}
	] .find(ele=>ele.id===id);
	// return {...formIte2,id: "formControl"+upperCase(formIte2.id)};
	return {...formItem,id: "formControl"+upperCase(formItem.id)};
};
const InputField=params =>{
	const { id, label, hide, help, validationState=null,...props }=params;
	if(hide) return <div></div>;
	return (
		<FormGroup controlId={id} validationState={validationState}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>);
};
const getProps=props=>{
	const {UI,updateUI}=props;
	const formValues=defaults(UI.formValues);
	const checkIt=id=>{
		updateUI({[id]:{...formSetting(UI,id)}})
	};
	const getConfig=id=>_getConfig(id,{...props,checkIt});
	return {formValues,getConfig,checkIt};
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
