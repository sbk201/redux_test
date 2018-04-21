import { connect } from 'react-redux'
import React, { Component } from "react";
import { updateUI,smart } from '../Actions.js'
import Users from '../components/Users'
import {keeps} from '../init/global';
const contName="Users";
class UsersContainer extends Component {
  componentDidMount() {
    this.props.fetch();
  }
  
  render(){
    const rest=keeps(this.props,"users")
    return (<Users {...rest}/>)
  }
}
const mapStateToProps = (state) => {
  // console.log(self)
  return keeps(state,"users")
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
      fetch:()=>{dispatch(smart.users.get())}
    // addMessage:text=>dispatch(smart.addMessage({text})),
    // delMessage:id=>dispatch(smart.delMessage(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer)