import { connect } from 'react-redux'
import React, { Component } from "react";
import { updateUI,smart } from '../Actions.js'
import Offices from '../components/Offices'
import {keeps} from '../init/global';
const contName="Offices";
class OfficesContainer extends Component {
  componentDidMount() {
    this.props.fetch();
  }
  
  render(){
    const rest=keeps(this.props,"offices")
    return (<Offices {...rest}/>)
  }
}
const mapStateToProps = (state) => {
  // console.log(self)
  return keeps(state,"offices")
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
      fetch:()=>{dispatch(smart.offices.get())}
    // addMessage:text=>dispatch(smart.addMessage({text})),
    // delMessage:id=>dispatch(smart.delMessage(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfficesContainer)