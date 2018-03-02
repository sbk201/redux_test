import { connect } from 'react-redux'
import { updateUI } from '../Actions.js'
import CustomerList from '../components/CustomerList'
const contName="CustomerList";
const mapStateToProps = (state) => {

  const UI=state.localUI[contName];
  const loading= UI&&UI.status==='loading';
  const finished= UI&&UI.status==='finished';
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
    customers,UI, status:{loading,finished}
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
  return {
    updateUI:cmd=>dispatch(updateUI({...cmd,contName})),
  }
}

const _Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerList)

export default _Container