import { connect } from 'react-redux';
import React, { Component } from "react";
import { updateUI, smart} from '../Actions.js';
import SalaryResult from '../components/SalaryResult';
import { omit, pipe, merge, lte, is, evolve, curry} from 'ramda';
import {travelArray} from '../init/project';

const contName="SalaryResultCont";
class SalaryResultCont extends Component {
  componentDidMount() {
  }
  
  render(){
    const props=this.props;
    const to= pipe(x=> x*10, Math.round, x=> x/10);
    const compution= pipe(compute, evolve({preDay:to, preHour:to, totalHours:to}),
    )(props.form);
    // console.log("compution ",compution);
    const output=pipe(omit(['form']), merge(compution)
    )(props);
    const {preDay, preHour}= output;
    const check= target=> is(Number,target) && lte(0,target);
    if(!check(preDay) || !check(preHour)) return <div>Please Fill</div>
    return <SalaryResult {...output}/>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const {jobs, counter}=state;
  return {
    UI, jobs, counter
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  const dispatchFn= fn=> params=> dispatch(fn(params));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    addJob: dispatchFn(smart.addJob)
  }
}

const compute= form=> {
  const {mode, salary, dutyDays, dutyHours, travelIndex, travelCost, mpf}= form;
  const ifFn= curry( (condit, fn, value)=> condit? fn(value) : value )
  if(!is(Number,salary)) return;
  if(mode=== 'advance') return advanceFn();
  return simpleFn();
  function simpleFn() {
    const preDay= salary/dutyDays;
    const preHour= preDay/dutyHours;
    const totalHours= dutyHours;
    return {preDay, preHour, totalHours, salary}
  }
  function advanceFn() {
    const forMpf= ifFn(mpf, x=> x* .95);
    const newSalary= pipe(forMpf)(salary);
    const totalHours= dutyHours+ travelArray[travelIndex]/60;
    const preDay= newSalary/dutyDays -travelCost;
    const preHour= preDay/totalHours;
    return {preDay, preHour, totalHours, salary}
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalaryResultCont)

