import { connect } from 'react-redux'
import { updateUI,smart } from '../Actions.js'
import React from "react";
import { Component } from 'react';
import TodosContainer from './TodosContainer'
const contName="AsyncApp";
const mapStateToProps = (state) => {
  return { }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getMessage:()=>dispatch(smart.getMessage()),
  }
}

class AsyncApp extends Component {
 
  componentDidMount() {
    this.props.getMessage();
  }
  render(){
    return <TodosContainer/>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AsyncApp)