import { connect } from 'react-redux'
import {pick} from 'lodash';
import { smart,updateUI,pickedSbu,pickedCountry } from '../Actions.js'
import React, { Component } from "react";
import Main from '../components/Main'
const contName="Main";

class MainContainer extends Component {
  shouldComponentUpdate(){
    const {sbus,countries}=this.props.data;
    const loaded=sbus&&countries;
    return !loaded
  }
  componentDidMount() {
    this.props.fetch();
  }
  
  render(){
    const rest=pick(this.props,["pageView","data","updateUI", "pickedItems", "fetchSearch"])
    return <Main {...rest}/>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const loading= UI.status==='loading';
  const finished= UI.status==='finished';
  const {pageView}=state;
  return {
    data:state.main,pageView, UI, status:{loading,finished}
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
)(MainContainer)



// const mapStateToProps = (state) => {
//   const UI=state.localUI[contName] || {};
//   const loading= UI.status==='loading';
//   const finished= UI.status==='finished';
//   const {pageView}=state;
//   return {
//     data:state.main,pageView, UI, status:{loading,finished}
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateUI:cmd=>dispatch(updateUI({...cmd,contName})),
//     fetch1: ()=> dispatch(smart.fetchMain()),
//     pickedItems:({sbu,country})=>{
//       dispatch(pickedSbu(sbu));
//       dispatch(pickedCountry(country));
//     },
//     fetchPrepare: params=>dispatch(smart.afterSearchView(params))
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Main)