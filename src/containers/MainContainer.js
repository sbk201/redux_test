import { connect } from 'react-redux'
import { updateUI,fetchMain,afterSearchView,pickedSbu,pickedCountry } from '../Actions.js'
import Main from '../components/Main'
const contName="Main";
const mapStateToProps = (state) => {
  const UI=state.localUI[contName] || {};
  const loading= UI.status==='loading';
  const finished= UI.status==='finished';
  const {pageView}=state;
  return {
    data:state.main,pageView, UI, status:{loading,finished}
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUI:cmd=>dispatch(updateUI({...cmd,contName})),
    fetch1: ()=> dispatch(fetchMain()),
    pickedItems:(items)=>{
      const {sbu,country}=items;
      dispatch(pickedSbu(sbu));
      dispatch(pickedCountry(country));
    },
    fetchPrepare: params=>dispatch(afterSearchView(params))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)