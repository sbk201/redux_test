import { connect } from 'react-redux'
import { toggleTodo,deleteTodo } from '../actions'
import TodosList from '../components/TodosList'


const mapStateToProps = (state) => {
  return {
    todos:state.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTodo:createdAt=>dispatch(toggleTodo(createdAt)) ,
    deleteTodo:createdAt=>dispatch(deleteTodo(createdAt))
  }
}

const TodosListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosList)

export default TodosListContainer