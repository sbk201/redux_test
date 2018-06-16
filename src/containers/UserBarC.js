import { connect } from 'react-redux'
import React, { Component } from "react";
import {omit} from 'lodash';
import { checkUser,updateUI } from '../Actions.js'
import UserSign from '../components/UserSign';

const contName="UserBarContainer";
class UserBarContainer extends Component {
  shouldComponentUpdate(nextProps){
    return true
  }
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

const getProps=props=>{
  const {userProfile}=props;
  const UserState=()=>{
    if(!userProfile) return <div></div>
    const {email,displayName}=userProfile;
    return <div>Hello {displayName} , email: {email}</div>
  }
	return {UserState}
}
const UserBar=props=>{
  	const {userProfile,checkUser,UI,updateUI}=props;
  	const {UserState}=getProps(props);
	return (
		<div>  
      <UserState/>
      <UserSign {...{userProfile,checkUser,UI,updateUI}}/>
		</div>
	);
}
export {UserBar}