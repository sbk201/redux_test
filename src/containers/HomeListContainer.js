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
    const {updateUI}=this.props;
    const {page=1,entries=10}=this.props.UI;
    updateUI({page,entries});
  }
  
  render(){
    const rest=pick(this.props,["UI","updateUI","reps","sbus","fetchRep","fetchAllocation","selectReps"])
    if(!(rest.reps || rest.hospitals)) return <div>Loading</div>
    return <HomeList {...rest}/>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const {reps,sbus}=state;
  return {
    reps,sbus,UI
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    fetchRep: param=> dispatch(smart.fetchRep(param)),
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    selectReps:id=>dispatch(selectReps(id)),
    fetchAllocation:id=>dispatch(smart.fetchAllocation(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
