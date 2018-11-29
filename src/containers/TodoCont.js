import { connect } from 'react-redux'
import {omit} from 'lodash';
import {updateUI,smart} from '../Actions.js'
import React, { Component } from "react";
import Todo from '../components/Todo'
const contName="Todo";

class TodoCont extends Component {
  componentDidMount() {
    this.props.fetch();
  }
  
  render(){
    return <div>
      <Todo {...this.props}/>
    </div>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const {todos}=state;
  return {
    todos
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    fetch:()=>dispatch(smart.fetchTodos()),
    postTodo:todo=>dispatch(smart.postTodo(todo)),
    deleteTodo: id=>dispatch(smart.deleteTodo(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoCont)
