import { connect } from 'react-redux'
import {omit} from 'lodash';
import {updateUI} from '../Actions.js'
import React, { Component } from "react";
import FormFill from '../components/FormFill'
import {switchFP} from "../init/global";
const contName="FormFill";

class FormFillCont extends Component {
  componentDidMount() {
    // this.props.fetch();
  }
  
  render(){
    const rest=omit(this.props,[""]);

    return <div><FormFill {...rest}/></div>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  return {UI,getFormItem }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
  }
}

// const updateUI_=ele=> ({...ele,onChange:e=>updateUI({[ele.id]:~~e.target.value,...pick(ele,["validationState","help","hide","value"])})})
const isInt=x=>Number.isInteger(x);
const getFormItem=(UI,updateUI)=>[{
  id:"age",
  label:"Age",
  type:"number",
  validationState:switchFP(UI.age,x=>[[!x,null], [!isInt(x),"error"], [x<12,"error"], [true,"success"]]),
  help: switchFP(UI.age,x=>[ [!x,null], [!isInt(x),"Must be a Number?"], [x<12,"must older than 12"], [true,null] ]),
  onChange:value=>updateUI({age:value})
} ,{
  id:"salary",
  label:"Salary",
  hide: !UI.age || UI.age<18,
  validationState:switchFP(UI.salary,x=>[[!x,null], [!isInt(x),"error"], [true,"success"]]),
  help: switchFP(UI.salary,x=>[ [!isInt(x),"must be a number"], [true,null] ]),
  onChange:value=>updateUI({salary:value})
},{
  id:"interest",
  label:"Interest",
  options:[["sport","sport"],["music","music"],["games","games"]],
  type:"checkbox",
  onChange:value=>updateUI({interest:value})
},{
  id:"isRich",
  label:"Are you Rich?",
  // hide: !UI.salary || UI.salary<10000,
  value:UI.isRich,
  type:"radio",
  options:[["rich",true],["poor",false]],
  // validationState:switchFP(UI.isRich,x=>[[!x,null], [,"error"], [true,"success"]]),
  // help: switchFP(UI.isRich,x=>[ [!Number.isInteger(x),"must be a number"], [true,null] ]),
  onChange:value=>updateUI({isRich:value})
},{
  id:"toy",
  label:"Toy",
  hide: !UI.age || UI.age<12 || UI.age>=18,
  validationState:switchFP(UI.toy,x=>[[!x,null], [x.length<4,"error"], [true,"success"]]),
  help: switchFP(UI.toy,x=>[ [x.length<4,"must write at least 5 letters"], [true,null] ]),
  onChange:value=>updateUI({toy:value})
}]
// .map(updateUI_)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormFillCont)
