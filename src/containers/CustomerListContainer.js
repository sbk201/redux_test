import { connect } from 'react-redux'
import { updateUI,fetchCustomers,selectCust } from '../Actions.js'
import CustomerList from '../components/CustomerList'
const contName="CustomerList";
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const {pickedSbu,pickedCountry}=state.main;
  const loading= UI.status==='loading';
  const finished= UI.status==='finished';
  const contact=state.contact;
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
    pickedSbu,pickedCountry,contact,customers,UI, status:{loading,finished}
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUI:cmd=>dispatch(updateUI({...cmd,contName})),
    fetchCust: params=>dispatch(fetchCustomers(params)),
    selectCust:id=>dispatch(selectCust(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerList)

