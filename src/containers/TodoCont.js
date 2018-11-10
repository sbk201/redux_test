import { connect } from 'react-redux'
import {pick} from 'lodash';
import {updateUI} from '../Actions.js'
import React, { Component } from "react";
import Todo from '../components/Todo'
const contName="Todo";

class TodoCont extends Component {
  componentDidMount() {
    // this.props.fetch();
  }
  
  render(){
    const rest=pick(this.props,[""])
    return <div><Todo {...rest}/></div>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoCont)
