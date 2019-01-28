import { connect } from 'react-redux';
import React, { Component } from "react";
import { updateUI, smart} from '../Actions.js';
import SalaryResult from '../components/SalaryResult';
import {pipe, lte, is, evolve} from 'ramda';
const contName="SalaryResultCont";
class SalaryResultCont extends Component {
  componentDidMount() {
  }
  
  render(){
    const {preDay, preHour}= this.props;
    const to= pipe(x=> x*10, Math.round, x=> x/10);
    const check= target=> is(Number,target) && lte(0,target);
    const output=evolve({preDay:to, preHour:to, totalHours:to})(this.props);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalaryResultCont)

