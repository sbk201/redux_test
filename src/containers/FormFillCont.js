import { connect } from 'react-redux'
import {pick,omit} from 'lodash';
import {updateUI} from '../Actions.js'
import React, { Component } from "react";
import FormFill from '../components/FormFill'
const contName="FormFill";

class FormFillCont extends Component {
  componentDidMount() {
    // this.props.fetch();
  }
  
  render(){
    const rest=omit(this.props,[""]);

    return <div><FormFill {...rest}/></div>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  return {UI }
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
)(FormFillCont)
