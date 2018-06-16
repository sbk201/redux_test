import { connect } from 'react-redux'
import {omit} from 'lodash';
import { checkUser,smart,updateUI } from '../Actions.js'
import React, { Component } from "react";
import ChatWindow from '../components/ChatWindow'
const contName="ChatWindowContainer";

class ChatWindowContainer extends Component {
  shouldComponentUpdate(nextProps){
    // won't update
    // const {sbus,countries}=this.props.data;
    // const loaded=sbus&&countries;
    // return !loaded
    return true
  }
  componentDidMount() {
    this.props.checkUser();
    this.props.fetchingMessage();
  }
  
  render(){
    const rest=omit(this.props,[""])
    return <ChatWindow {...rest}/>
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
    checkUser:()=>dispatch(checkUser()),
    fetchingMessage:()=>dispatch(smart.fetchingMessage())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatWindowContainer)
