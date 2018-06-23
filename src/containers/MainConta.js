import { connect } from 'react-redux'
import {pick} from 'lodash';
import { smart,updateUI,pickedSbu,pickedCountry } from '../Actions.js'
import React, { Component } from "react";
import CustomerListConta from './CustomerListConta'
import Main from '../components/Main'
const contName="Main";

class MainConta extends Component {
  shouldComponentUpdate(nextProps){
    // won't update
    const {sbus,countries}=this.props.data;
    const loaded=sbus&&countries;
    return !loaded
  }
  componentDidMount() {
    this.props.fetch();
  }
  
  render(){
    const rest=pick(this.props,["data","updateUI", "pickedItems", "fetchSearch"])
    return <div><Main {...rest}/><CustomerListConta/></div>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const loading= UI.status==='loading';
  const finished= UI.status==='finished';
  return {
    data:state.main, UI, loading,finished
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    fetch: ()=> dispatch(smart.fetchMain()),
    fetchSearch: params=>dispatch(smart.afterSearchView(params)),
    pickedItems:({sbu,country})=>{
      dispatch(pickedSbu(sbu));
      dispatch(pickedCountry(country));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainConta)
