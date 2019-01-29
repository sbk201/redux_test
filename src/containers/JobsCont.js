import { connect } from 'react-redux'
import {updateUI, updateJob} from '../Actions.js'
import React, { Component } from "react";
import Jobs from '../components/Jobs'
const contName="Jobs";

class JobsCont extends Component {
  componentDidMount() {
    
  }
  
  render(){
    return <Jobs {...this.props}/>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const {jobs} = state;
  return { UI, jobs }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchFn= fn=> params=> dispatch(fn(params));
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI: cmd=>dispatchUI({...cmd,contName}),
    updateJob: dispatchFn(updateJob)
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobsCont)
