import { connect } from 'react-redux'
import { updateUI,selectEmp } from '../Actions.js'
import Allocate from '../components/Allocate'
import {uniqueArrKey} from '../init/global';
const contName="Allocate";
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const loading= UI.status==='loading';
  const finished= UI.status==='finished';
  const {pageView,employee,customers:customers_}=state;
  const customers=(function(){
    if(!customers_) return [];
    const selected= customers_.filter(ele=>ele.selected);
    const noRepeated=selected.filter(uniqueArrKey('globalCustNbr'));
    return noRepeated
  })();

  return {
    pageView,employee,customers, UI, status:{loading,finished}
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUI:cmd=>dispatch(updateUI({...cmd,contName})),
    selectEmp:id=>dispatch(selectEmp(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Allocate)