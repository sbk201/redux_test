import { connect } from 'react-redux'
import {pick} from 'lodash';
import {updateUI,smart} from '../Actions.js'
import React, { Component } from "react";
import Home from '../components/Home'
const contName="Home";

class HomeCont extends Component {
  componentDidMount() {
    this.props.listen();
  }
  
  render(){
    return <div><Home {...this.props}/></div>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const {news} = state;
  return {news }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    listen:()=>dispatch(smart.listenNews()),
    postTodo:todo=>dispatch(smart.postTodo(todo)),
    deleteTodo: id=>dispatch(smart.deleteTodo(id)),
    postTag:tag=>dispatch(smart.postTag(tag)),
    // listen:()=>dispatch(smart.listenTodos())

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeCont)
