import { connect } from 'react-redux'
import {pick} from 'lodash';
import { smart,updateUI,pickedSbu,pickedCountry } from '../Actions.js'
import React, { Component } from "react";
import Admin from '../components/Admin'
const contName="Admin";

class AdminCont extends Component {
  componentDidMount() {
    this.props.fetch();
  }
  
  render(){
    const rest=pick(this.props,["users"]);
    if(!rest.users) return <div>Loading</div>
    return <Admin {...rest}/>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const loading= UI.status==='loading';
  const finished= UI.status==='finished';
  const users=state.users;
  return {
    users
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
