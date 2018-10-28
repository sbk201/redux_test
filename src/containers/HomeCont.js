import { connect } from 'react-redux'
import {omit} from 'lodash';
import { smart,updateUI } from '../Actions.js'
import React, { Component } from "react";
import Home from '../components/Home'
import { Redirect } from "react-router-dom";
const contName="HomeCont";

class HomeCont extends Component {
  componentDidMount() {
    this.props.checkUser();
  }
  
  render(){
    const rest=omit(this.props,[""])
    const user=rest.userInfo;
    const {logged}=user || {};
    if(logged===undefined) return <div>Checking User</div>
    if(!user.username) return <Redirect to="/signIn"/>
    return <Home {...rest}/>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const {userInfo}=state;
  return {
    userInfo,UI
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    checkUser:()=>dispatch(smart.checkUser()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeCont)
