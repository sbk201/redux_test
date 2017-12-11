import { connect } from 'react-redux'
import { newQuestion,addRecord } from '../actions'
import Records from '../components/Records'


const mapStateToProps = (state) => {
  return {
    question:state.question
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newQuestion:(time)=>{
      dispatch(newQuestion());
      dispatch(addRecord(time));
    }
  }
}

const SelectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Records)

export default SelectionContainer