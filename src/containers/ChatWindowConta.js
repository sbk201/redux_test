import { connect } from 'react-redux'
import {omit} from 'lodash';
import { addText,updateMessage,smart,updateUI } from '../Actions'
import React, { Component } from "react";
import ChatWindow from '../components/ChatWindow'
const contName="ChatWindowConta";

class ChatWindowConta extends Component {
  shouldComponentUpdate(nextProps){
    // won't update
    // const {sbus,countries}=this.props.data;
    // const loaded=sbus&&countries;
    // return !loaded
    return true
  }
  componentDidMount() {
    this.props.fetchingMessage();
  }
  
  render(){
    const rest=omit(this.props,[""])
    return <ChatWindow {...rest}/>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const {userInfo,messages}=state;
  return {
    userInfo,UI,messages
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    addText:params=>dispatch(addText(params)),
    delText:id=>dispatch(updateMessage({id,removed:true})),
    fetchingMessage:()=>dispatch(smart.fetchingMessage())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatWindowConta)
