import { connect } from 'react-redux'
import React, { Component } from "react";
import {omit} from 'lodash';
import { smart,updateUI } from '../Actions.js'
import SignIn from '../components/SignIn';
import {FirebaseUI} from '../fireBase';

const contName="SignInConta";
class SignInConta extends Component {
  componentDidMount() {}
  
  render(){
    const rest=omit(this.props,[""])
    const {userInfo={},checkUse2}=rest;
    const {username}=userInfo ||{};
    if(!userInfo) return <FirebaseUI {...{checkUse2}}/>
    if(userInfo && !username) return <div>has userInfo,no displayName</div>
    // no userProfile >> FirebaseUI/
    // has userProfile,no displayName >> Fill/
    // has userProfile,has displayName >> navigate to /home
    // <FirebaseUI/>
    return <SignIn {...rest}/>
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
    checkUse2:user=>dispatch(smart.checkUse2(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInConta)

