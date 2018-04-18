import { connect } from 'react-redux'
import { smart,updateUI,selectCust,nextView } from '../Actions.js'
import CustomerList from '../components/CustomerList'
const contName="CustomerList";
const mapStateToProps = (state,ownProps) => {
  const UI=state.localUI[contName] || {};
  const {pickedSbu,pickedCountry}=state.main;
  const loading= UI.status==='loading';
  const finished= UI.status==='finished';
  const {contact,pageView}=state;
  const customers=(function (){
    if(!finished) return []
    const removeAttr=attr=>ele=>{
      const {[attr]:_,...rest}=ele;
      return {...rest}
    }
    const custs=state.customers;
    const unusedAttr= UI.method==='unassigned';
    if(unusedAttr) {
      return custs.map(removeAttr('destCountrycode'))
    }else{
      return custs
    }
  })();
  return {
    pageView,pickedSbu,pickedCountry,contact,customers,UI, status:{loading,finished}
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
)(CustomerList)

