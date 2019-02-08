import { connect } from 'react-redux'
import {updateUI, updateJob} from '../Actions.js'
import React, { Component } from "react";
import Job from '../components/Job'
import { merge} from 'ramda';
const contName="Job";

class JobsCont extends Component {
  componentDidMount() {
    
  }
  
  render(){
    const props=this.props;
    const id=Number(props.match.params.id);
    const thisJob= props.jobs.find(job=> job.id===id);
    const output=merge({thisJob})(props);
    if(!thisJob) return <div>This Job doesn't exist.</div>
    return <Job {...output}/>
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
