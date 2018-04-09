import { connect } from 'react-redux'
import { updateUI,addMessage,smart } from '../Actions.js'
import Todos from '../components/Todos'
const contName="Todos";
const mapStateToProps = (state,self) => {
  const {message}=state;
  const {children}=self;
  // console.log(self)
  return {message,children}
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
)(Todos)