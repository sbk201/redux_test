import { connect } from 'react-redux'
import {pick} from 'lodash';
import {updateUI } from '../Actions.js'
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
    const rest=pick(this.props,["reps"])
    if(!(rest.reps || rest.hospitals)) return <div>Loading</div>
    return <HomeList {...rest}/>
  }
}
const mapStateToProps = (state) => {
  // const UI=state.localUI[contName] || {};
  const {reps}=state;
  return {
    reps
  }
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
)(HomeContainer)
