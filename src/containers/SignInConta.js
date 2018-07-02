import { connect } from 'react-redux'
import React, { Component } from "react";
import {omit} from 'lodash';
import { smart,updateUI } from '../Actions.js'
import {FirebaseUI} from '../fireBase';
import {_Input} from '../init/global';
import { Button } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

const contName="SignInConta";
class SignInConta extends Component {
  componentDidMount() {
    const {checkUse3}=this.props;
    this.props.checkUse3();
  }
  
  render(){
    const Fill=({save})=>{
      const Input=_Input(this);
      return (<div>
              Pick Your Username <br/>
              <Input refer={"username"}></Input> <br/>
              <Button onClick={()=>save(this.username.value)}>Submit</Button>
            </div>)
    }
    /*

    got to check current user,then render firebaseUI

    */
    const rest=omit(this.props,[""])
    const {UI,userInfo={},checkUse3}=rest;
    const {username}=userInfo ||{};
    const logged=userInfo && userInfo.logged;
    if(!logged) return <div>firebaseUI <FirebaseUI/></div>
    if(logged && !username) return <div><Fill save={rest.updateUserProfile}/></div>
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
    checkUse3:user=>dispatch(smart.checkUse3(user)),
    updateUserProfile:user=>dispatch(smart.updateUserProfile(user)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInConta)

