import { connect } from 'react-redux'
import React, { Component } from "react";
import {omit} from 'lodash';
import { checkUser,updateUI } from '../Actions.js'
import SignIn from '../components/SignIn';
import {FirebaseUI} from '../fireBase';

const contName="SignInConta";
class SignInConta extends Component {
  componentDidMount() {}
  
  render(){
    const rest=omit(this.props,[""])
    const {userProfile}=rest;
    if(!userProfile) return <FirebaseUI/>
      // if(userProfile && !userProfile)
    // no userProfile >> FirebaseUI/
    // has userProfile,no displayName >> Fill/
    // has userProfile,has displayName >> navigate to /home
    // <FirebaseUI/>
    return <SignIn {...rest}/>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const {userProfile}=state;
  return {
    userProfile,UI
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInConta)

