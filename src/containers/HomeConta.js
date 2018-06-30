import { connect } from 'react-redux'
import {omit} from 'lodash';
import { smart,updateUI } from '../Actions.js'
import React, { Component } from "react";
import Home from '../components/Home'
import { Redirect } from "react-router-dom";
const contName="HomeConta";

class HomeConta extends Component {
  componentDidMount() {
    this.props.checkUse2();
  }
  
  render(){
    const rest=omit(this.props,[""])
    const user=rest.userInfo;
    // if(user && !user.displayName) return <Redirect to="/signIn"/>
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
    updateAllUI:cmd=>dispatch(updateUI({...cmd})),
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    updateUserProfile:name=>dispatch(smart.updateUserProfile(name)),
    checkUse2:()=>dispatch(smart.checkUse2()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeConta)
