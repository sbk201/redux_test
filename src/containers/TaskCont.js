import { connect } from 'react-redux'
import {pick} from 'lodash';
import { smart,updateUI,pickedSbu,pickedCountry } from '../Actions.js'
import React, { Component } from "react";
import Task from '../components/Task'
const contName="Task";

class AdminCont extends Component {
  componentDidMount() {
    this.props.fetch();
  }
  
  render(){
    // const rest=pick(this.props,["data","updateUI", "pickedItems", "fetchSearch"])
    return <Task />
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const loading= UI.status==='loading';
  const finished= UI.status==='finished';
  return {
    // data:state.main, UI, loading,finished
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    fetch: ()=> dispatch(smart.fetchUsers()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCont)
