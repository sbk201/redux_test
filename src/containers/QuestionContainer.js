import { connect } from 'react-redux'
import { newQuestion } from '../actions'
import Question from '../components/Question'


const mapStateToProps = (state) => {
  return {
    question:state.question
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick:()=>{
      dispatch(newQuestion());
    }
  }
}

const QuestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Question)

export default QuestionContainer