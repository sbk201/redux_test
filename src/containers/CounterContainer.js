import { connect } from 'react-redux'
import { addNumber } from '../actions'
import Counter from '../components/Counter'


const mapStateToProps = (state) => {
  return {
    number:state.number
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddNumber:()=>{
      dispatch(addNumber())
    }
    // onTodoClick: (id) => {
      // dispatch(toggleTodo(id))
    // }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default VisibleTodoList