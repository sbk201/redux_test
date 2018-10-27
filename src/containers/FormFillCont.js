import { connect } from "react-redux";
import {updateUI} from "../Actions.js";
import React, { Component } from "react";
import FormFill from "../components/FormFill";
import {switchFP,objLoop,objLoop2,objLoop3} from "../init/global";
const contName="FormFill";

class FormFillCont extends Component {
	componentDidMount() {
		// this.props.fetch();
	}
  
	render(){
		const {UI,updateUI}=this.props;
		const allItem=getAllFormItem(UI,updateUI);
		const rest={...this.props,allItem};
		if(1) return <div><FormFill {...rest}/></div>;

	}
}
const mapStateToProps = (state) => {
	const UI=state.localUI[contName] || {};
	return {UI };
};
const mapDispatchToProps = (dispatch) => {
	const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
	return {
		updateUI:cmd=>dispatchUI({...cmd,contName}),
	};
};

const getAllFormItem=(UI,updateUI)=>{
	const isInt=x=>Number.isInteger(x);
	const checkNum=(x,message="Must be a Number")=>[!isInt(x),message];
	const f=(it,id)=>it.find(e=>e.id===id);
	const hideFn=id=>it=>it.find(e=>e.id===id);
	const switchFun=fun=>v=>switchFP(v,fun);
	const addition=ele=>({...ele,onChange:v=>updateUI({[ele.id]:v})});
  const obj=(k,v)=>({[k]:v});
  const setHide=raw=>objLoop3(([key,va])=>{
      if(key==="hide") return obj(key,va(raw));
      return obj(key,va);
    });
	const toValid=objLoop3(([key,va])=>{
		if(key==="valid") return {"validationState":va};
		return obj(key,va);
	});
  const setValid=item=> objLoop2(item,([key,va])=>{
    if(key==="valid" || key==="help" ) {
      return switchFP(UI[item.id],va);
    }
    return va;
  });
	const raw=[
		{
			id:"age",
			label:"Age 10",
			type:"number",
			valid: x=>[ [!x,null], checkNum(x,"error"), [x<10,"error"], [true,"success"] ] ,
			help:  x=>[ [!x,null], checkNum(x), [x<10,"must more than 10"], [true,null] ] ,
		} ,{
			id:"salary",
			label:"Salary",
			type:"number",
			hide: it=> f(it,"age").valid!=="success",
			valid: x=>[ [!x,null], checkNum(x,"error"), [x<10,"error"], [true,"success"] ] ,
			help:  x=>[ [!x,null], checkNum(x), [x<10,"must more than 10"], [true,null] ] ,
		},{
			id:"interest",
			label:"Interest (checkbox)",
			type:"checkbox",
			options:[ ["sport","sport"],["music","music"],["games","games"] ],
		},{
			id:"isRich",
			label:"Are you Rich? (radio)",
			type:"radio",
			value: UI.isRich,
			options:[ ["rich",true],["poor",false] ],
		},{
			id:"toy",
			label:"Toy",
			valid: x=>[ [!x,null], [x.length<5,"error"], [true,"success"] ] ,
			help:  x=>[ [x.length<6,"must write at least 5 letters"], [true,null] ] ,
		},{
			id:"date",
			label:"Pick a Date",
			type:"date",
			hide: it=> f(it,"age").valid!=="success",
		}
	].map(addition).map(setValid);
	return raw.map(setHide(raw)).map(toValid);
	// const allRaw=getAllFormItem(UI,updateUI).map(setValid);
	
};
/*
[{
  id:"age",
  label:"Age 10",
  type:"number",
  valid: switchFun( x=>[ [!x,null], checkNum(x,"error"), [x<10,"error"], [true,"success"] ] ),
  help:  switchFun( x=>[ [!x,null], checkNum(x), [x<10,"must more than 10"], [true,null] ] ),
  onChange:value=>updateUI({age:value})
} ,{
  id:"salary",
  label:"Salary",
  type:"number",
  hide: it=> hideFn(it,"age").valid!=="success",
  valid: switchFun( x=>[ [!x,null], checkNum(x,"error"), [x<10,"error"], [true,"success"] ] ),
  help:  switchFun( x=>[ [!x,null], checkNum(x), [x<10,"must more than 10"], [true,null] ] ),
  onChange:value=>updateUI({salary:value})
},{
  id:"interest",
  label:"Interest (checkbox)",
  type:"checkbox",
  options:[ ["sport","sport"],["music","music"],["games","games"] ],
  onChange:value=>updateUI({interest:value})
},{
  id:"isRich",
  label:"Are you Rich? (radio)",
  type:"radio",
  options:[ ["rich",true],["poor",false] ],
  onChange:value=>updateUI({isRich:value})
},{
  id:"toy",
  label:"Toy",
  valid: switchFun( x=>[ [!x,null], [x.length<4,"error"], [true,"success"] ] ),
  help:  switchFun( x=>[ [x.length<4,"must write at least 5 letters"], [true,null] ] ),
  onChange:value=>updateUI({toy:value})
},{
  id:"date",
  label:"Pick a Date",
  type:"date",
  hide: it=> f(it,"age").valid!=="success",
  onChange:value=>updateUI({date:value})
}]
*/
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormFillCont);



