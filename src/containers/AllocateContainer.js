import { connect } from 'react-redux'
import { smart,updateUI,selectEmp,checkShare } from '../Actions.js'
import Allocate from '../components/Allocate'
import {pick} from 'lodash';
import React, { Component } from "react";
import { uniqueArrKey } from '../init/global';
const contName="Allocate";
class AllocateContainer extends Component {
  componentDidMount(){
    const {customers,history}=this.props;    
    const noData=customers.length<=0;
    if(noData) history.push('/');
  }
  render(){
    const rest=pick(this.props,["pickedSbu","employee","customers","UI","finished","updateUI","selectEmp", "checkShare", "editShare"])
    return <Allocate {...rest}/>
  }
}
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const loading= UI.status==='loading';
  const finished= UI.status==='finished';
  const {employee,customers:customers_,main:{pickedSbu}}=state;
  const customers=(function(){
    if(!customers_) return [];
    const selected= customers_.filter(ele=>ele.selected);
    const noRepeated=selected.filter(uniqueArrKey('globalCustNbr'));
    return noRepeated
  })();

  return {
    pickedSbu,employee,customers,UI, status:{loading,finished}
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}))
  return {
    updateUI:cmd=>dispatchUI(cmd),
    selectEmp:id=>{
      dispatch(selectEmp(id))
      dispatch(checkShare({globalEmpNbr:id}))
    },
    checkShare:params=>dispatch(checkShare(params)),
    editShare:params=>{
      const {customers:customer, selectedEmp,pickedSbu:sbuid}=params;
      dispatch(smart.editShare({customer,selectedEmp,sbuid}))
    },
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllocateContainer)