import { connect } from 'react-redux'
import { updateUI,selectEmp,updateShare,editShare } from '../Actions.js'
import Allocate from '../components/Allocate'
import { uniqueArrKey } from '../init/global';
const contName="Allocate";
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const loading= UI.status==='loading';
  const finished= UI.status==='finished';
  const shareObj= UI.shareObj||{};
  const {pageView,employee,customers:customers_,main:{pickedSbu}}=state;
  const customers=(function(){
    if(!customers_) return [];
    const selected= customers_.filter(ele=>ele.selected);
    const noRepeated=selected.filter(uniqueArrKey('globalCustNbr'));
    return noRepeated
  })();

  return {
    pageView,pickedSbu,employee,customers, shareObj,UI, status:{loading,finished}
  }
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}))
  return {
    updateUI:cmd=>dispatchUI(cmd),
    selectEmp:id=>{
      dispatch(selectEmp(id))
      dispatch(updateShare({GlobalEmpNbr:id}))
    },
    updateShare:params=>dispatch(updateShare(params)),
    editShare:params=>{
      const {customers:customer, selectedEmp,pickedSbu:sbuid}=params;
      dispatch(editShare({customer,selectedEmp,sbuid}))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Allocate)