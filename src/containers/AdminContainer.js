import { connect } from 'react-redux'
import {pick} from 'lodash';
import { smart,updateUI} from '../Actions.js'
import React, { Component } from "react";
import Admin from '../components/Admin'
const contName="Admin";

class AdminContainer extends Component {
  componentDidMount() {
    this.props.fetch(["20000737","20000744","20000749"]);
  }
  
  render(){
    const rest=pick(this.props,["gcnCustomers"])
    return <Admin {...rest}/>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const loading= UI.status==='loading';
  // const finished= UI.status==='finished';
  const {gcnCustomers}=state;
  return {
    gcnCustomers,loading
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    fetch: param=> dispatch(smart.fetchAdmin(param)),
    // fetch: ()=> dispatch(smart.fetchAdmin()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContainer)
