import { connect } from 'react-redux'
import {omit} from 'lodash';
import {smart,updateUI,selectReps,selectHosps } from '../Actions.js'
import React, { Component } from "react";
import HomeList from '../components/HomeList'
const contName="HomeList";

class HomeListContainer extends Component {
  shouldComponentUpdate(nextProps){
    return true
  }
  componentDidMount() {
    const {updateUI}=this.props;
    const {page=1,entries=10}=this.props.UI;
    const status=this.props.UI.status || 'init';
    updateUI({page,entries,status});
  }
  
  render(){

    const rest=omit(this.props,[""])
    const status=rest.UI.status
    if(status==='init') return <div></div>
    if(status==='loading') return <div>Loading</div>
    return <HomeList {...rest}/>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const {sbus,reps,hospitals}=state;
  return {
    UI,sbus,reps,hospitals
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    fetchRep: param=> dispatch(smart.fetchRep(param)),
    fetchHospital:id=>dispatch(smart.fetchHospital(id)),
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    selectReps:id=>dispatch(selectReps(id)),
    selectHosps:id=>dispatch(selectHosps(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeListContainer)
