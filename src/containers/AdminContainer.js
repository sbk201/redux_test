import { connect } from 'react-redux'
import {pick} from 'lodash';
import { smart,updateUI} from '../Actions.js'
import React, { Component } from "react";
import Admin from '../components/Admin'
const contName="Admin";

class AdminContainer extends Component {
  componentDidMount() {
    this.props.fetch();
  }
  
  render(){
    const rest=pick(this.props,[])
    // const rest=pick(this.props,["data","updateUI", "pickedItems", "fetchSearch"])
    return <Admin {...rest}/>
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
    fetch: ()=> console.log('will fetch'),
    // fetch: ()=> dispatch(smart.fetchAdmin()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContainer)
