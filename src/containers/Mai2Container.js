import { connect } from 'react-redux'
import {pick} from 'lodash';
import { smart,updateUI } from '../Actions.js'
import React, { Component } from "react";
import Mai2 from '../components/Mai2'
const contName="Mai2";

class Mai2Container extends Component {
  shouldComponentUpdate(nextProps){
    // won't update
    // const {sbus,countries}=this.props.data;
    // const loaded=sbus&&countries;
    // return !loaded
    return true
  }
  componentDidMount() {
    this.props.fetch();
  }
  
  render(){
    const rest=pick(this.props,["data"])
    return <div><Mai2 {...rest}/></div>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const loading= UI.status==='loading';
  const finished= UI.status==='finished';
  const data={data:'some data'};
  return {
    data
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    fetch: ()=> dispatch(smart.fetchMai2()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mai2Container)
