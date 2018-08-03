import { connect } from 'react-redux'
import { updateUI } from '../Actions.js'
import Donut from '../components/Donut'
const contName="Donut";
const mapStateToProps = (state,{name}) => {
  const {ideas}=state;
  const UI=state.localUI[contName] || {};
  return {ideas,name,UI}
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    updateUI:cmd=>dispatchUI({...cmd,contName}),
    // addMessage:text=>dispatch(addMessage(text)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Donut)