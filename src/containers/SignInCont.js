import { connect } from 'react-redux'
import React, { Component } from "react";
import {omit} from 'lodash';
import { smart,updateUI } from '../Actions.js'
import {FirebaseUI} from '../fireBaseUI';
import {_Input} from '../init/global';
import { Redirect } from "react-router-dom";

const contName="SignInCont";
class SignInCont extends Component {
  componentDidMount() {
    this.props.checkUser();
  }
  
  render(){
    const Fill=({save})=>{
      const Input=_Input(this);
      return (<div>
              Pick Your Username <br/>
              <Input refer={"username"}></Input> <br/>
              <button onClick={()=>save(this.username.value)}>Submit</button>
            </div>)
    }
    const rest=omit(this.props,[""])
    const {userInfo={}}=rest;
    const {username}=userInfo ||{};
    const logged=userInfo && userInfo.logged;
    if(logged===null || logged===undefined ) return <div></div>
    if(!logged) return <div>firebaseUI <FirebaseUI/></div>
    if(!username) return <div><Fill save={rest.updateUserInfo}/></div>
      console.log('redirect to home',userInfo,username)
    return <Redirect to="/"/>
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
    checkUser:user=>dispatch(smart.checkUser(user)),
    updateUserInfo:user=>dispatch(smart.updateUserInfo(user)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInCont)

