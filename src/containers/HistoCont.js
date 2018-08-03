import { connect } from 'react-redux'
import { updateUI } from '../Actions.js'
import Histo from '../components/Histo'
const contName="Histo";
const mapStateToProps = (state) => {
  const {ideas}=state;
  const UI=state.localUI[contName] || {};
  return {ideas,UI}
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
)(Histo)