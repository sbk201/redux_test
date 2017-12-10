import { connect } from 'react-redux'
import { newQuestion } from '../actions'
import Selection from '../components/Selection'


const mapStateToProps = (state) => {
  return {
    question:state.question
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newQuestion:()=>{
      dispatch(newQuestion());
    }
  }
}

const SelectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Selection)

export default SelectionContainer