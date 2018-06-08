import { connect } from 'react-redux'
import {pick} from 'lodash';
import { smart,updateUI } from '../Actions.js'
import React, { Component } from "react";
import Home from '../components/Home'
import HomeListContainer from '../containers/HomeListContainer'
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
    // console.log(db);
  }
  
  render(){
    const rest=pick(this.props,["sbus","fetchHospital","fetchRep"])
    return <div>
      <Home {...rest}/> 
      </div>
  }
}
const mapStateToProps = (state) => {
  // const UI=state.localUI[contName] || {};
  const {sbus}=state;
  return {
    sbus
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    fetch: ()=> dispatch(smart.fetchHome()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
