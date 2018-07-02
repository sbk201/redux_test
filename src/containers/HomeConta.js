import { connect } from 'react-redux'
import {omit} from 'lodash';
import { smart,updateUI } from '../Actions.js'
import React, { Component } from "react";
import Home from '../components/Home'
import { Redirect } from "react-router-dom";
const contName="HomeConta";

class HomeConta extends Component {
  componentDidMount() {
    this.props.checkUse3();
    // this.props.checkUse2();
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
    updateUserProfile:name=>dispatch(smart.updateUserProfile(name)),
    checkUse3:()=>dispatch(smart.checkUse3()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeConta)
