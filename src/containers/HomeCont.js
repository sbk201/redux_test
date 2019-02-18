import { connect } from 'react-redux'
import {updateUI} from '../Actions.js'
import React, { Component } from "react";
import Home from '../components/Home'
import {isEmpty} from 'ramda';
const contName="Home";
const ifEmptyElse = (a, b) => isEmpty(a) ? b : a;
class HomeCont extends Component {
  componentDidMount() {
    // this.props.listen();
    const defaultConfig= {dutyDays:5, dutyHours:9, 
      travelIndex: 0, travelCost: 0, salary:10000, mode:"simple"};
    const outputConfig = ifEmptyElse(this.props.UI, defaultConfig);
    this.props.updateUI(outputConfig);
  }
  
  render(){
    if(isEmpty(this.props.UI)) return <div>Loading</div>
    return <Home {...this.props}/>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  return { UI }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    // listen:()=>dispatch(smart.listenNews()),
    // postTodo:todo=>dispatch(smart.postTodo(todo)),
    // deleteTodo: id=>dispatch(smart.deleteTodo(id)),
    // postTag:tag=>dispatch(smart.postTag(tag)),
    // listen:()=>dispatch(smart.listenTodos())

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeCont)
