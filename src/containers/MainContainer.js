import { connect } from 'react-redux'
import { updateUI,fetchMain,fetchMain2 } from '../Actions.js'
import Main from '../components/Main'
const contName="Main";
const mapStateToProps = (state) => {
  const UI=state.localUI[contName];
  const loading= UI&&UI.loading;
  return {
    data:state.main,
     UI, loading
  }
}
const mapDispatchToProps = (dispatch) => {
  const UI= cmd=>updateUI({...cmd,contName})
  return {
    fetch1: async ()=> {
      dispatch(UI({loading:'init'}));
      await dispatch(fetchMain());
      dispatch(UI({loading:'done'}));
    },
    updateUI:cmd=>dispatch(updateUI({...cmd,contName})),
    fetch2: (params)=>dispatch(fetchMain2(params))
    // postTodos:(text)=> dispatch(postTodos(text)),
    // deleteTodos:(_id)=>console.log(_id),
    // deleteTodos:(_id)=> dispatch(deleteTodos(_id)),
  }
}

const _Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

export default _Container