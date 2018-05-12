import { connect } from 'react-redux'
import { updateUI,smart } from '../Actions.js'
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
    addMessage:text=>dispatch(smart.message.add({text})),
    delMessage:id=>dispatch(smart.message.del(id)),
    dispatchUI,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos)