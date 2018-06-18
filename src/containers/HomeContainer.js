import { connect } from 'react-redux'
import {omit} from 'lodash';
import { checkUser,smart,updateUI } from '../Actions.js'
import React, { Component } from "react";
import Home from '../components/Home'
import { Button } from 'semantic-ui-react'
import {_Input} from '../init/global';
const contName="HomeContainer";

class HomeContainer extends Component {
  shouldComponentUpdate(nextProps){
    // won't update
    // const {sbus,countries}=this.props.data;
    // const loaded=sbus&&countries;
    // return !loaded
    return true
  }
  componentDidMount() {
    this.props.checkUser();
  }
  
  render(){
  const Input=_Input(this);
  const Fill=({save})=><div>
    Pick Your Username <br/>
    <Input refer={"username"}></Input> <br/>
    <Button onClick={save}>Submit</Button>
    </div>
  const rest=omit(this.props,[""])
  const save=()=>rest.updateUserProfile(this.username.value);
  const user=rest.userProfile;
  // if(!user) return <div>loading user</div>
  if(user && !user.displayName) return <Fill save={save}/>
  return <Home {...rest}/>
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
    updateUserProfile:name=>dispatch(smart.updateUserProfile(name)),
    checkUser:()=>dispatch(checkUser()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
