import { connect } from 'react-redux'
import {pick} from 'lodash';
import {smart,updateUI,selectReps } from '../Actions.js'
import React, { Component } from "react";
import HomeList from '../components/HomeList'
const contName="HomeList";

class HomeContainer extends Component {
  shouldComponentUpdate(nextProps){
    // won't update
    // const {reps,countries}=this.props.data;
    // const loaded=reps&&countries;
    // return !loaded
    return true
  }
  componentDidMount() {
    // this.props.fetch();
  }
  
  render(){
    const rest=pick(this.props,["reps","sbus","fetchRep","selectReps"])
    if(!(rest.reps || rest.hospitals)) return <div>Loading</div>
    return <HomeList {...rest}/>
  }
}
const mapStateToProps = (state) => {
  // const UI=state.localUI[contName] || {};
  const {reps,sbus}=state;
  return {
    reps,sbus
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    fetchRep: param=> dispatch(smart.fetchRep(param)),
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    selectReps:id=>dispatch(selectReps(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
