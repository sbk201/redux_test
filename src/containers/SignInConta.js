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
    const {checkUser}=this.props;
    this.props.checkUser();
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
    const rest=omit(this.props,[""])
    const {UI,userInfo={}}=rest;
    const {username}=userInfo ||{};
    const logged=userInfo && userInfo.logged;
    if(logged===null || logged===undefined ) return <div></div>
    if(!logged) return <div>firebaseUI <FirebaseUI/></div>
    if(!username) return <div><Fill save={rest.updateUserName}/></div>
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
    updateUserName:user=>dispatch(smart.updateUserName(user)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInConta)

