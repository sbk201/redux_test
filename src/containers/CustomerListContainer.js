import { connect } from 'react-redux'
import { smart,updateUI,selectCust,nextView } from '../Actions.js'
import {pick,omit} from 'lodash';
import React, { Component } from "react";
import CustomerList from '../components/CustomerList'
const contName="CustomerList";

class CustomerListContainer extends Component {
  componentDidMount() {
    const {updateUI}=this.props;
    const {page=1,entries=10}=this.props.UI;
    // const page=this.props.UI.page || 1;
    // const entries=this.props.UI.entries || 1;
    updateUI({page,entries});
  }
  
  render(){
    const {finished,data}=this.props;
    if(!finished) return <div></div>;
    if(!data.length) return <div>No Results</div>
    const rest=pick(this.props,["pickedSbu","pickedCountry","data","UI", "status","updateUI" ,"fetchCust" ,"selectCust" ,"nextView" ])
    return <CustomerList {...rest}/>
  }
}


const mapStateToProps = (state,ownProps) => {
  const UI=state.localUI[contName] || {};
  const {pickedSbu,pickedCountry}=state.main;
  const loading= UI.status==='loading';
  const finished= UI.status==='finished';
  const {contact,customers}=state;

  const data=(function () {
    const customers_=(function() {
      const custs=customers;
      if(UI.method!=='unassigned') return custs
      const omitAttr=attr=>ele=> omit(ele,attr);
      return custs.map(omitAttr('destCountrycode'))
    })();
    return UI.method==='contact' ? contact : customers_;  
  })();
  return {
    pickedSbu,pickedCountry,data,UI, loading,finished
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUI:cmd=>dispatch(updateUI({...cmd,contName})),
    fetchCust: params=>dispatch(smart.fetchGetCustomers(params)),
    selectCust:id=>dispatch(selectCust(id)),
    nextView:view=>dispatch(nextView(view)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerListContainer)

