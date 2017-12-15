import { connect } from 'react-redux'
import { newQuestion,addRecord } from '../actions'
import Selection from '../components/Selection'


const mapStateToProps = (state) => {
  return {
    question:state.question,
    recordAt:state.recordAt,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newQuestion:({time,question})=>{
      dispatch(newQuestion());
      dispatch(addRecord(time,question));
    }
  }
}

const SelectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Selection)

export default SelectionContainer