import { connect } from 'react-redux'
import { updateUI,fetchMain,fetchMain2 } from '../Actions.js'
import Main from '../components/Main'
const contName="Main";
const mapStateToProps = (state) => {
  const UI=state.localUI[contName];
  const loading= UI&&UI.status==='loading';
  const finished= UI&&UI.status==='finished';
  return {
    data:state.main,
     UI, status:{loading,finished}
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUI:cmd=>dispatch(updateUI({...cmd,contName})),
    fetch1: async ()=> await dispatch(fetchMain()),
    fetch2: (params)=>dispatch(fetchMain2(params))
  }
}

const _Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

export default _Container