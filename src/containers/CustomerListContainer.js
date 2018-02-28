import { connect } from 'react-redux'
import { updateUI } from '../Actions.js'
import CustomerList from '../components/CustomerList'
const contName="CustomerList";
const mapStateToProps = (state) => {
  const UI=state.localUI[contName];
  const loading= UI&&UI.loading;
  const method= UI&&UI.method;
  const customers=state.customers || [];
  const tableHeader={
    unassigned :{
      GlobalCustName:'Customer Number',
      globalCustNbr:'Customer Name'   
    } ,
    customer:{
      GlobalCustName:'Global Customer Name',
      globalCustNbr:'Global Customer Nbr',
      custName:'Local Customer Name',
      localCustNbr:'Local Customer Nbr'
    },
    contact:{
      GlobalEmpName:'Global Employee Name',
      GlobalEmpNbr:'Global Employee Number'
    }
  }[method];
  return {
    customers, tableHeader,UI, loading
  }
  // console.log('state.method is :',state.method)
  // console.log('match',match);

  // unassigned > { GlobalCustName: "Zia Mujeeb Limited", globalCustNbr: "GAF00000001", destCountrycode: "AF" }
  
  // customer > { GlobalCustName: "  Genea Ltd - Launceston ", globalCustNbr: "GAU06711000"
  // , custName: "Genea Ltd - Launceston", localCustNbr: "67110" }
  
  // contact > { GlobalEmpName: "Brock Mooney", GlobalEmpNbr: "33189" } > 
  // { GlobalCustName: "  Genea Ltd - Launceston ", globalCustNbr: "GAU06711000",
  // custName: "Genea Ltd - Launceston", localCustNbr: "67110" }
}
const mapDispatchToProps = (dispatch) => {
  const UI= cmd=>updateUI({...cmd,contName})
  return {
    updateUI:cmd=>dispatch(updateUI({...cmd,contName})),
  }
}

const _Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerList)

export default _Container