import { connect } from 'react-redux'
import React, { Component } from "react";
import {omit} from 'lodash';
import { checkUser,updateUI } from '../Actions.js'
import UserBar from '../components/UserBar';

const contName="UserBarContainer";
class UserBarContainer extends Component {
  componentDidMount() {}
  
  render(){
    const rest=omit(this.props,[""])
    return <UserBar {...rest}/>
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
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    checkUser:()=>dispatch(checkUser())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBarContainer)

