import { connect } from 'react-redux'
import {updateUI} from '../Actions.js'
import React, { Component } from "react";
import FormFill from '../components/FormFill'
import {switchFP,objLoop,objLoop2} from "../init/global";
const contName="FormFill";

class FormFillCont extends Component {
  componentDidMount() {
    // this.props.fetch();
  }
  
  render(){
    const {UI,updateUI}=this.props;
    const {setValid,setHide,toValid}=gets();
    const allRaw=getAllFormItem(UI,updateUI).map(setValid);
    const allItem=allRaw.map(setHide).map(toValid);
    const rest={...this.props,allItem};
    if(1) return <div><FormFill {...rest}/></div>

    function gets(){
      const setValid=item=> objLoop2(item,([key,va])=>{
        if(key==="valid" || key==="help" ) return va(UI[item.id])
        return va
      });
      const setHide=item=> objLoop2(item,([key,va])=>{
        if(key==="hide") {return va(allRaw) }
        return va
      });
      const o=(k,v)=>({[k]:v});
      const toValid=item=>objLoop(item,([key,va])=>{
        if(key==="valid") return {"validationState":va}
          return o(key,va)
      });
      return {setValid,setHide,toValid}
    };
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  return {UI }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
  }
}


const getAllFormItem=(UI,updateUI)=>{
  const isInt=x=>Number.isInteger(x);
  const f=(it,id)=>it.find(e=>e.id===id);
  return [{
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
    hide: it=>{return console.log(it) || f(it,"age").valid!=="success"},
    valid:v=>switchFP(v,x=>[ [!x,null], [!isInt(x),"error"], [x<10,"error"], [true,"success"] ]),
    help: v=>switchFP(v,x=>[ [!x,null], [!isInt(x),"Must be a Number?"], [x<10,"must older than 10"], [true,null] ]),
    onChange:value=>updateUI({age:value})
  }]
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormFillCont)



