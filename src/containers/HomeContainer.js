import { connect } from 'react-redux'
import {pick} from 'lodash';
import { checkUser,smart,updateUI } from '../Actions.js'
import React, { Component } from "react";
import Home from '../components/Home'
const contName="Home";

class HomeContainer extends Component {
  shouldComponentUpdate(nextProps){
    // won't update
    // const {sbus,countries}=this.props.data;
    // const loaded=sbus&&countries;
    // return !loaded
    return true
  }
  componentDidMount() {
    // this.props.checkUser();
    // console.log(db);
  }
  
  render(){
    const rest=pick(this.props,["checkUser"])
    return <div>
      <Home {...rest}/> 
      </div>
  }
}
const mapStateToProps = (state) => {
  // const UI=state.localUI[contName] || {};
  const {}=state;
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    checkUser:()=>dispatch(checkUser())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
