import { connect } from 'react-redux'
import { updateUI,addMessage,smart } from '../Actions.js'
import Donut from '../components/Donut'
const contName="Donut";
const mapStateToProps = (state) => {
  const {message}=state;
  return {message}
}
const mapDispatchToProps = (dispatch) => {
  const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
  return {
    // addMessage:text=>dispatch(addMessage(text)),
    addMessage:text=>dispatch(smart.addMessage({text})),
    delMessage:id=>dispatch(smart.delMessage(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Donut)