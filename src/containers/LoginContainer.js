import { connect } from 'react-redux'
import React, { Component } from "react";
import { updateUI,smart } from '../Actions.js'
import Login from '../components/Login'
import {keeps} from '../init/global';
const contName="Login";
class LoginContainer extends Component {
  componentDidMount() {
  }
  
  render(){
    const rest=keeps(this.props,["loginCall"])
    return (<Login {...rest}/>)
  }
}
const mapStateToProps = (state) => {
  // console.log(self)
  return {}
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
      loginCall:param=>dispatch(smart.users.login(param)),
      dispatchUI
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)