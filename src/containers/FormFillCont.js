import { connect } from 'react-redux'
import {omit,flow,deepClone} from 'lodash';
import {updateUI} from '../Actions.js'
import React, { Component } from "react";
import FormFill from '../components/FormFill'
import {switchFP,rename,objLoop2} from "../init/global";
const contName="FormFill";

class FormFillCont extends Component {
  componentDidMount() {
    // this.props.fetch();
  }
  
  render(){
    const {UI,updateUI}=this.props;
    const getFormIte3=id=>{
      const piece=getAllFormItem(UI,updateUI).find(ele=>ele.id===id);
      const loop=piece=>objLoop2(piece,([key,va])=>{
        if(key==="valid" || key==="help" ) return va(UI[id])
        return va
      });
    	Object.assign(window,{getAllFormItem:this.props.getAllFormItem,UI,updateUI,getFormIte3})
      const renamee=piece=>rename(piece,"valid","validationState");
      return flow(loop,renamee)(piece)
    }
    const getFormIte4=id=>{
    	const all=getAllFormItem(UI,updateUI);
      const piece=all.find(ele=>ele.id===id);
      const loop=piece=>objLoop2(piece,([key,va])=>{
        if(key==="valid" || key==="help" ) return va(UI[id])
        if(key==="hide") return va(all)
        return va
      });
      const renamee=piece=>rename(piece,"valid","validationState");
      return flow(loop,renamee)(piece)
    }
    const setValid=item=>{
    	// console.log(item)
    	const id=item.id;
	    return objLoop2(item,([key,va])=>{
	        if(key==="valid" || key==="help" ) return va(UI[id])
	        return va
	      });
    }
    const allRaw=getAllFormIte2(UI,updateUI).map(setValid);
    window.allRaw=allRaw;
    const setHide=item=>{
    	const id=item.id;
    	const result= objLoop2(item,([key,va])=>{
	        if(key==="hide") {return va(allRaw) }
	        return va
	      });
    	return result;
    }
    const allItem=allRaw.map(setHide);

    const rest={...this.props,getFormIte4,allItem};
    return <div><FormFill {...rest}/></div>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  return {UI,getAllFormItem }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
  }
}

// const updateUI_=ele=> ({...ele,onChange:e=>updateUI({[ele.id]:~~e.target.value,...pick(ele,["validationState","help","hide","value"])})})
const isInt=x=>Number.isInteger(x);

const getAllFormItem=(UI,updateUI)=>[{
  id:"age",
  label:"Age 10",
  type:"number",
  valid:v=>switchFP(v,x=>[ [!x,null], [!isInt(x),"error"], [x<10,"error"], [true,"success"] ]),
  help: v=>switchFP(v,x=>[ [!x,null], [!isInt(x),"Must be a Number?"], [x<10,"must older than 10"], [true,null] ]),
  onChange:value=>updateUI({age:value})
} ,{
  id:"age2",
  label:"Age 20",
  type:"number",
  hide: it=>'fine',
  valid:v=>switchFP(v,x=>[ [!x,null], [!isInt(x),"error"], [x<10,"error"], [true,"success"] ]),
  help: v=>switchFP(v,x=>[ [!x,null], [!isInt(x),"Must be a Number?"], [x<10,"must older than 10"], [true,null] ]),
  onChange:value=>updateUI({age:value})
}]
// const getById=id=>
const getAllFormIte2=(UI,updateUI)=>[{
  id:"age",
  label:"Age 10",
  type:"number",
  valid:v=>switchFP(v,x=>[ [!x,null], [!isInt(x),"error"], [x<10,"error"], [true,"success"] ]),
  help: v=>switchFP(v,x=>[ [!x,null], [!isInt(x),"Must be a Number?"], [x<10,"must older than 10"], [true,null] ]),
  onChange:value=>updateUI({age:value})
} ,{
  id:"age2",
  label:"Age 20",
  type:"number",
  hide: it=>{
  	console.log(it);
  	return it[0].valid!=="success"
  },
  valid:v=>switchFP(v,x=>[ [!x,null], [!isInt(x),"error"], [x<10,"error"], [true,"success"] ]),
  help: v=>switchFP(v,x=>[ [!x,null], [!isInt(x),"Must be a Number?"], [x<10,"must older than 10"], [true,null] ]),
  onChange:value=>updateUI({age:value})
}]

// const getAllFormItem=(UI,updateUI)=>[{
//   id:"age",
//   label:"Age",
//   type:"number",
//   valid:v=>switchFP(v,x=>[ [!x,null], [!isInt(x),"error"], [x<12,"error"], [true,"success"] ]),
//   help: v=>switchFP(v,x=>[ [!x,null], [!isInt(x),"Must be a Number?"], [x<12,"must older than 12"], [true,null] ]),
//   onChange:value=>updateUI({age:value})
// } ,{
//   id:"salary",
//   label:"Salary",
//   hide: (it)=>console.log('hide is :',it) ||false,
//   valid:v=>switchFP(v,x=>[ [!x,null], [!isInt(x),"error"], [true,"success"] ]),
//   help: v=>switchFP(v,x=>[ [!isInt(x),"must be a number"], [true,null] ]),
//   onChange:value=>updateUI({salary:value})
// },{
//   id:"interest",
//   label:"Interest",
//   options:[ ["sport","sport"],["music","music"],["games","games"] ],
//   type:"checkbox",
//   onChange:value=>updateUI({interest:value})
// },{
//   id:"isRich",
//   label:"Are you Rich?",
//   // hide: !UI.salary || UI.salary<10000,
//   value:UI.isRich,
//   type:"radio",
//   options:[ ["rich",true],["poor",false] ],
//   // valid:v=>switchFP(v,x=>[ [!x,null], [,"error"], [true,"success"] ]),
//   // help: v=>switchFP(v,x=>[ [!Number.isInteger(x),"must be a number"], [true,null] ]),
//   onChange:value=>updateUI({isRich:value})
// },{
//   id:"toy",
//   label:"Toy",
//   hide: ({age})=>!UI.age || UI.age<12 || UI.age>=18,
//   valid:v=>switchFP(v,x=>[ [!x,null], [x.length<4,"error"], [true,"success"] ]),
//   help: v=>switchFP(v,x=>[ [x.length<4,"must write at least 5 letters"], [true,null] ]),
//   onChange:value=>updateUI({toy:value})
// }]

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormFillCont)



