import { connect } from 'react-redux'
import { updateUI } from '../Actions.js'
import Allocate from '../components/Allocate'
const contName="Allocate";
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const loading= UI.status==='loading';
  const finished= UI.status==='finished';
  const {pageView,employee,customers:customers_}=state;
  const customers=customers_ && customers_.filter(ele=>ele.selected);

  return {
    pageView,employee,customers, UI, status:{loading,finished}
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUI:cmd=>dispatch(updateUI({...cmd,contName})),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Allocate)