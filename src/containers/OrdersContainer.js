import { connect } from 'react-redux'
import React, { Component } from "react";
import { updateUI,smart } from '../Actions.js'
import Orders from '../components/Orders'
import {keeps} from '../init/global';
const contName="Orders";
class OrdersContainer extends Component {
  componentDidMount() {
    // this.props.fetch();
  }
  
  render(){
    const rest=keeps(this.props,"orders")
    return (<Orders {...rest}/>)
  }
}
const mapStateToProps = (state) => {
  // console.log(self)
  return keeps(state,"orders")
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
      fetch:()=>{dispatch(smart.orders.get())}
    // addMessage:text=>dispatch(smart.addMessage({text})),
    // delMessage:id=>dispatch(smart.delMessage(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersContainer)