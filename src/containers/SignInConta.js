import { connect } from 'react-redux'
import React, { Component } from "react";
import {omit} from 'lodash';
import { smart,updateUI } from '../Actions.js'
import SignIn from '../components/SignIn';
import {FirebaseUI} from '../fireBase';
import {_Input} from '../init/global';
import { Button } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

const contName="SignInConta";
class SignInConta extends Component {
  componentDidMount() {}
  
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
    const {userInfo={},checkUse2}=rest;
    const {username}=userInfo ||{};
    if(!userInfo) return <FirebaseUI {...{checkUse2}}/>
    if(userInfo && !username) return <div><Fill save={(name)=>rest.updateUserProfile(name)}/></div>
    // no userProfile >> FirebaseUI/
    // has userProfile,no displayName >> Fill/
    // has userProfile,has displayName >> navigate to /home
    // <FirebaseUI/>
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
    checkUse2:user=>dispatch(smart.checkUse2(user)),
    updateUserProfile:user=>dispatch(smart.updateUserProfile(user)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInConta)

