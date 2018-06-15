import { connect } from 'react-redux'
import {omit} from 'lodash';
import { smart,updateUI } from '../Actions.js'
import React, { Component } from "react";
import Home from '../components/Home'
import HomeListContainer from '../containers/HomeListContainer'
const contName="Home";

class HomeContainer extends Component {
  shouldComponentUpdate(nextProps){
    return true
  }
  componentDidMount() {
    this.props.fetch();
  }
  
  render(){
    const rest=omit(this.props,["fetch"])
    if(!rest.sbus) return <div>Loading</div>
    return <div>
      <Home {...rest}/>
      <HomeListContainer/>  
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
    fetchRep: param=> dispatch(smart.fetchRep(param)),
    fetchHospital: param=> dispatch(smart.fetchHospital(param)),
    getList: (param)=> dispatch(smart.getHospList(param)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
