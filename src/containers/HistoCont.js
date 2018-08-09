import { connect } from 'react-redux'
import { updateUI } from '../Actions.js'
import Histo from '../components/Histo'
import {omit} from "lodash";
import React, { Component } from "react";


const contName="HistoCont";
class HistoCont extends Component {
  render(){
    const rest= omit(this.props,[""]);
        
    return <Histo {...rest}/>;
  }
}
const mapStateToProps = (state) => {
  const {ideas}=state;
  const UI=state.localUI[contName] || {};
  return {ideas}
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    // addMessage:text=>dispatch(addMessage(text)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoCont)