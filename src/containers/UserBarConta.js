import { connect } from 'react-redux'
import React, { Component } from "react";
import {omit} from 'lodash';
import { smart,signOut,updateUI } from '../Actions.js'
import UserBar from '../components/UserBar';

const contName="UserBarConta";
class UserBarConta extends Component {
  componentDidMount() {}
  
  render(){
    const rest=omit(this.props,[""])
    return <UserBar {...rest}/>
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
    signOut:()=>dispatch(signOut())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBarConta)

