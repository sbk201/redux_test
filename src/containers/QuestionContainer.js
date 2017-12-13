import { connect } from 'react-redux'
import { newQuestion,addRecord } from '../actions'
import Question from '../components/Question'


const mapStateToProps = (state) => {
  return {
    question:state.question
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick:(time)=>{
      dispatch(newQuestion());
      dispatch(addRecord(time));
    }
  }
}

const QuestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Question)

export default QuestionContainer