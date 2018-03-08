import { connect } from 'react-redux'
import { updateUI,fetchCustomers } from '../Actions.js'
import CustomerList from '../components/CustomerList'
const contName="CustomerList";
const mapStateToProps = (state) => {
  const UI=state.localUI[contName];
  const {pickedSbu,pickedCountry}=state.main;
  const loading= UI&&UI.status==='loading';
  const finished= UI&&UI.status==='finished';
  const contact=state.contact;
  const customers=(()=>{
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
    pickedSbu,pickedCountry,contact,customers,UI, status:{loading,finished}
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUI:cmd=>dispatch(updateUI({...cmd,contName})),
    fetchCust: (params)=>dispatch(fetchCustomers(params))
    //  GlobalEmpNbr>>>globalEmpNbr
  }
}

const _Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerList)

export default _Container